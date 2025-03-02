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
              <form>
                <div class="search_input_group">
                  <select v-model="searchType">
                    <option value="도서명">도서명</option>
                    <option value="저자">저자</option>
                  </select>
                  <div class="input_wrapper">
                    <input v-model="searchKeyword" placeholder="검색어를 입력해주세요." @keyup.enter="handleSearch" />
                    <button @click="handleSearch">🔍</button>
                  </div>
                </div>
              </form>
            </div>

          </div>

        </div>

        <div class="book-list">
          <div class="book-item" v-for="book in data" :key="book.doc.isbn13">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBookList } from '@/apis/books';
import { BOOK_BADGE_LIST } from '@/constants/book-badge';
import type { BookItem } from '@/types/libraryType';
import { useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

const searchType = ref('도서명');
const searchKeyword = ref('');
const sortType = ref('도서명');

const handleSearch = () => {
  console.log("검색어:", searchKeyword.value);
};

const { data } = useQuery<BookItem[]>({
  queryKey: ['bookList', searchKeyword.value, sortType.value],
  queryFn: () => getBookList(searchKeyword.value, 1, 15),
})

</script>

<style lang="scss" scoped>
@import './BookView.scss';
</style>
