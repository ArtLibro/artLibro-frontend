<template>
  <div class="wrap">
    <!-- 책 소개  -->
    <div class="book-detail-header">
      <div v-if="isLoading">로딩중...</div>
      <div v-else class="book-detail-container">
        <div class="book-detail-left">
          <div class="goToBack">
            <GoToBack />
          </div>
          <img :src="detailData?.bookImageURL" alt="book-detail-bg" class="book-img">
        </div>
        <div class="book-detail-right">
          <div class="book-detail-right-contents">
            <h1>{{ detailData?.bookname }}</h1>

            <div class="book-info">
              <div class="book-info-item">
                <div class="book-info-item-title">저자정보</div>
                <p class="book-info-item-text">{{ detailData?.authors }}</p>
              </div>

              <div class="book-info-item">
                <div class="book-info-item-title">출판사</div>
                <p class="book-info-item-text">{{ detailData?.publisher }}</p>
              </div>

              <div class="book-info-item">
                <div class="book-info-item-title">출판연도</div>
                <p class="book-info-item-text">{{ detailData?.publication_year }}</p>
              </div>

              <div class="book-info-item">
                <div class="book-info-item-title">주제분류</div>
                <p class="book-info-item-text">{{ detailData?.class_nm }}</p>
              </div>

            </div>

            <div class="book-description">
              <p>{{ detailData?.description }}</p>
            </div>
          </div>

          <div class="book-detail-sub-contents">
            <div class="book-loan-count-container">
              <p class="book-loan-count-title">대출건수</p>
              <p class="book-loan-count">{{ loanInfoData?.[0]?.Total?.loanCnt }}</p>
            </div>

            <div class="bookmark">
              <BookMartIcon strokeColor="#fff" />
              <span>북마크</span>
            </div>
          </div>

        </div>

      </div>
    </div>
    <!-- 책 소개  -->

    <!-- 도서관 정보 -->
    <div class="book-detail-body-container">
      <div class="book-library-info-container">
        <div class="book-library-info-left">
          <h2>도서 소장 도서관</h2>

          <div class="library-filter-container">
            <a-select v-model:value="regionValue" style="width: 200px" :options="regionOptions"
              @change="handleRegionChange"></a-select>
            <a-select v-model:value="regionValue1" style="width: 200px" :options="regionDetailOptions"
              @change="handleDetailRegionChange"></a-select>
          </div>

          <div class="library-table-container">
            <a-table :columns="columns" :data-source="tableData" :pagination="{ pageSize: 50 }" :scroll="{ y: 200 }"
              :custom-row="libraryClickHandler" />
          </div>
        </div>
        <div class="book-library-info-right">
          <div>지도 섹션</div>
        </div>
      </div>
    </div>
    <!-- 도서관 정보 -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BookMartIcon from './components/BookMartIcon.vue';
import { getBookDetail, getLibraryLoanPossible } from '@/apis/books';
import type { BookDetail } from '@/types/libraryType';
import GoToBack from '@/components/common/GoToBack.vue';
import { REGION_CODE } from '@/constants/regionCode';
import { REGION_DETAIL_CODE } from '@/constants/regionDetailCode';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const columns = [
  {
    title: 'NO',
    dataIndex: 'no',
    width: 60,
    textAlign: 'center',
  },
  {
    title: '도서관 명',
    dataIndex: 'libraryName',
    width: 300,
  },
  {
    title: '주소',
    dataIndex: 'address',
    width: 300,
  },
];

const tableData = ref<any[]>([]) // 도서관 테이블 데이터

const detailData = ref<BookDetail>() // 도서 상세 데이터
const loanInfoData = ref<any>() // 대출 정보 데이터

const libraryLoanPossibleData = ref<any>() // 대출 가능한 도서관 데이터

const isLoading = ref(false)

const regionValue = ref<number>(11)
const regionValue1 = ref<string>('세부 지역 선택')

// 지역 선택 옵션
const regionOptions = computed(() => {
  return REGION_CODE.map((region) => {
    return {
      label: region.name,
      value: region.code,
    }
  })
})

// 세부지역 선택 옵션
const regionDetailOptions = computed(() => {
  const regionName = REGION_CODE.find(region => region.code === regionValue.value)?.name;

  return REGION_DETAIL_CODE[regionName!].map((region) => {
    return {
      label: region.name,
      value: region.code,
    };
  });
});

// 대출 가능한 도서관 데이터 포맷팅
const formatLibraryLoanPossibleData = (libraryData: any) => {
  tableData.value = libraryData.libs.map((item: any, index: number) => ({
    no: index + 1,
    libraryName: item.lib.libName,
    address: item.lib.address,
    homepage: item.lib.homepage,
    latitude: item.lib.latitude,
    longitude: item.lib.longitude,
  }));
}

onMounted(async () => {
  isLoading.value = true
  try {
    // 도서 상세 데이터 조회
    const { detailData: fetchDetailData, loanInfoData: fetchLoanInfoData } = await getBookDetail(+props.id)
    detailData.value = fetchDetailData;
    loanInfoData.value = fetchLoanInfoData;

    // 대출 가능한 도서관 데이터 조회
    const libraryLoanPossible = await getLibraryLoanPossible(+props.id, regionValue.value = 11, null)
    libraryLoanPossibleData.value = libraryLoanPossible

    formatLibraryLoanPossibleData(libraryLoanPossible)
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error)
  } finally {
    isLoading.value = false
  }
});

const handleRegionChange = async (value: number) => {
  try {
    const response = await getLibraryLoanPossible(+props.id, value, null);

    formatLibraryLoanPossibleData(response);
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error)
  }
}

const handleDetailRegionChange = async (value: number) => {
  try {
    const response = await getLibraryLoanPossible(+props.id, regionValue.value, value);

    formatLibraryLoanPossibleData(response);
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error)
  }
}

// 도서관 테이블 클릭 이벤트
const libraryClickHandler = (record: any) => {
  return {
    onClick: () => {
      console.log(record)
    }
  }
}
</script>

<style scoped lang="scss">
@import './BookDetailView.scss';
</style>
