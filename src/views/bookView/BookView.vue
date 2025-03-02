<template>
  <div class="wrap">
    <div class="book_header">

    </div>
    <div class="container">

      <div class="keyword_container">
        <h2>이 달의 키워드</h2>
        <div class="keyword_badge_container">
          <div class="badge" v-for="badge in BOOK_BADGE_LIST" :key="badge.id">
            <span># {{ badge.title }}</span>
          </div>
        </div>
      </div>

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
            <div class="book-item" v-for="book in datas" :key="book.doc.isbn13">
              <div class="book-item-image">
                <img v-if="book.doc.bookImageURL" :src="book.doc.bookImageURL" alt="book-item-image">
                <p v-else>이미지가 없습니다</p>
              </div>

              <div class="book-item-info">
                <div class="book-badge-container">
                  <div class="book-badge">
                    <span># 키워드</span>
                  </div>

                  <div class="book-publisher">
                    <img src="/icons/book-publisher.svg" alt="book-publisher-icon">
                    <span>{{ book.doc.publisher }}</span>
                  </div>
                </div>

                <h3 class="book-title">{{ book.doc.bookname }}</h3>
                <p class="book-author">{{ book.doc.authors }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p>검색 결과가 없습니다.</p>
        </div>

        <div @click="handleFetchNextPage">더보기</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBookList } from '@/apis/books';
import { BOOK_BADGE_LIST } from '@/constants/book-badge';
import { searchTypeOptions, sortTypeOptions } from '@/constants/booksOption';
import QUERY_KEY from '@/constants/queryKey';
import type { BookItem, SearchTypeValue, SortOptionValue } from '@/types/libraryType';
import { useInfiniteQuery, type InfiniteData } from '@tanstack/vue-query';
import { ref } from 'vue';

const searchType = ref<SearchTypeValue>('도서명');
const searchKeyword = ref('');
const sortType = ref<SortOptionValue>('loan');

const handleSearch = () => {
  refetch();
};

const handleSortTypeChange = (value: SortOptionValue) => {
  sortType.value = value;
  refetch();
}

const handleFetchNextPage = () => {
  fetchNextPage();
  console.log(data.value)
}

// const { data, refetch } = useQuery<BookItem[]>({
//   queryKey: QUERY_KEY.BOOKS.bookList(searchKeyword.value, searchType.value),
//   queryFn: () => getBookList(searchKeyword.value, 1, searchType.value, sortType.value),
//   enabled: true,
// })

//todo: 타입 수정 필요
const { data, refetch, fetchNextPage } = useInfiniteQuery<BookItem[], unknown, InfiniteData<BookItem[]>, unknown[], number>({
  queryKey: QUERY_KEY.BOOKS.bookList(searchKeyword.value, searchType.value),
  queryFn: ({ pageParam }) => getBookList(searchKeyword.value, pageParam, searchType.value, sortType.value),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) =>
    lastPage.length === 15 ? allPages.length + 1 : undefined,
  enabled: true,
});

</script>

<style lang="scss" scoped>
@import './BookView.scss';
</style>
