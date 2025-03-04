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
              <a-input-group compact class="search_input_group">
                <a-select v-model="searchType" default-value="도서명">
                  <a-select-option value="도서명">도서명</a-select-option>
                  <a-select-option value="저자">저자</a-select-option>
                </a-select>
                <a-input v-model="searchKeyword" placeholder="검색어를 입력해주세요." />
              </a-input-group>
            </div>

            <div class="sortType_container">
              <a-select v-model="sortType" default-value="도서명" label-in-value style="width: 120px"
                :options="sortTypeOptions"></a-select>
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
import { onMounted, ref } from 'vue';

const searchType = ref('도서명');
const searchKeyword = ref('');
const sortType = ref('도서명');
const sortTypeOptions = ref([
  {
    label: '도서명순',
    value: '도서명순',
  },
  {
    label: '저자순',
    value: '저자순',
  },
  {
    label: '출판사순',
    value: '출판사순',
  },
  {
    label: '출판년도순',
    value: '출판년도순',
  },
]);

const data = ref<BookItem[]>([]);

const fetchBookList = async () => {
  const response = await getBookList(searchKeyword.value, 1, 15)

  data.value = response;

  console.log(response)
}

onMounted(() => {
  fetchBookList()
})

</script>

<style lang="scss" scoped>
.wrap {
  width: 1426px;
  margin: 0 auto;

  .book_header {
    background-image: url('/images/search-book-bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 100%;
    height: 490px;
    margin-bottom: 67px;
  }

  .container {
    width: 1246px;
    margin: 0 auto;

    .keyword_container {
      width: 100%;
      margin-bottom: 76px;

      h2 {
        font-size: $text-title-300;
        font-weight: bold;
        margin-bottom: 24px;
      }

      .keyword_badge_container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;

        .badge {
          display: inline-block;
          border-radius: 30px;
          border: 1px solid #D3D0CB;
          padding: .5rem 1rem;
          color: #61605D;
        }
      }
    }

    .book_list_container {
      width: 100%;
      font-size: $text-title-300;
      font-weight: bold;

      .book_list_header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          font-size: $text-title-300;
        }

        .book_list_header_right {
          display: flex;
          align-items: center;
          gap: 1rem;
          width: 57%;
          justify-content: space-between;

          .search_container {
            width: 580px;

            .search_input_group {
              display: flex;
            }
          }

          .sortType_container {
            font-size: 17px;
          }

        }

      }

      .book-list {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        column-gap: 20px;
        row-gap: 44px;

        .book-item {
          max-width: 230px;

          .book-item-image {
            width: 100%;
            height: 312px;
            margin-bottom: 6px;

            img {
              width: 100%;
              height: 100%;
              border: 1px solid #e2e0dd;
              border-radius: 8px;

            }
          }

          .book-item-info {

            .book-badge-container {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 6px;

              .book-badge {
                font-size: 11px;
                display: inline-block;
                border-radius: 3px;
                background-color: #EDE4F8;
                border: 1px solid $secondary-color-300;
                padding: .4rem 8px;
                color: $secondary-color-purple;
              }

              .book-publisher {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 14px;
                color: $text-color-300;
              }
            }

            .book-title {
              font-size: 20px;
              margin-bottom: 4px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .book-author {
              font-size: 14px;
              color: $text-color-300;
              margin: 0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
