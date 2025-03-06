<template>
  <div class="wrap">
    <div class="book_header"></div>
    <div class="container">

      <!-- 이달의 키워드 -->
      <KeywordContainer @handleKeywordClick="handleKeywordClick" />
      <!-- 이달의 키워드 -->

      <div class="book_list_container">
        <div class="book_list_header">
          <h2>전체 도서</h2>

          <div class="book_list_header_right">
            <div class="search_container">
              <form @submit.prevent="handleSearch" class="form">
                <select v-model="searchType" class="select">
                  <option v-for="option in searchTypeOptions" :key="option.value" :value="option.value">{{ option.label
                    }}</option>
                </select>
                <div class="line"></div>
                <div class="input_wrapper">
                  <input v-model="searchKeyword" placeholder="검색어를 입력해주세요." />
                  <button type="submit">
                    <img src="/icons/search.svg" alt="search-icon">
                  </button>
                </div>
              </form>

              <div class="type_select_container">
                <select v-model="sortType" class="type_select" @change="() => handleSortTypeChange(sortType)">
                  <option v-for="option in sortTypeOptions" :key="option.value" :value="option.value">{{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div v-if="data && data.pages.length > 0">
          <div class="book-list" v-for="datas in data.pages" :key="datas.length">
            <router-link class="book-item" v-for="book in datas" :key="book.doc.isbn13"
              :to="`/book/detail/${book.doc.isbn13}`">
              <div class="book-item-image">
                <img v-if="book.doc.bookImageURL" :src="book.doc.bookImageURL" alt="book-item-image">
                <p v-else>이미지가 없습니다</p>
              </div>

              <div class="book-item-info">
                <div class="book-badge-container">

                  <div class="book-publisher">
                    <img src="/icons/book-publisher.svg" alt="book-publisher-icon">
                    <span>{{ book.doc.publisher }}</span>
                  </div>
                </div>

                <h3 class="book-title">{{ book.doc.bookname }}</h3>
                <p class="book-author">{{ book.doc.authors }}</p>
              </div>
            </router-link>
          </div>
        </div>

        <div v-else>
          <p>검색 결과가 없습니다.</p>
        </div>

        <div ref="loadMoreTrigger" class="load-more-trigger"></div>
      </div>
    </div>

    <div class="goToTop" @click="handleGoToTop">TOP</div>
  </div>
</template>

<script setup lang="ts">
import { getBookList } from '@/apis/books';
import KeywordContainer from '@/components/bookView/KeywordContainer.vue';
import { searchTypeOptions, sortTypeOptions } from '@/constants/booksOption';
import QUERY_KEY from '@/constants/queryKey';
import type { BookItem, SearchTypeValue, SortOptionValue } from '@/types/libraryType';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/vue-query';
import { onMounted, ref } from 'vue';

const searchType = ref<SearchTypeValue>('도서명'); // 검색 타입
const searchKeyword = ref(''); // 도서 검색 키워드
const sortType = ref<SortOptionValue>('loan'); // 정렬 타입
const loadMoreTrigger = ref<HTMLDivElement | null>(null); // 무한 스크롤 트리거
const seletedKeyword = ref<string>(''); // 이달의 키워드 클릭 시 선택된 키워드

const handleKeywordClick = (keyword: string) => {
  seletedKeyword.value = keyword;
  refetch();
}

const handleSearch = () => {
  refetch();
};

const handleSortTypeChange = (value: SortOptionValue) => {
  sortType.value = value;
  refetch();
}

//todo: 타입 수정 필요
const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<BookItem[], unknown, InfiniteData<BookItem[]>, unknown[], number>({
  queryKey: QUERY_KEY.BOOKS.bookList(searchKeyword.value, searchType.value, seletedKeyword.value),
  queryFn: ({ pageParam = 1 }) => getBookList(searchKeyword.value, pageParam, searchType.value, sortType.value, seletedKeyword.value),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) =>
    lastPage.length === 18 ? allPages.length + 1 : undefined,
  enabled: true,
});

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage.value) {
      fetchNextPage();
    }

  }, { rootMargin: '100px' });

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

const handleGoToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style lang="scss" scoped>
@import './BookView.scss';
</style>
