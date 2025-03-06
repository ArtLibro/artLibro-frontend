<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import type { SelectProps } from 'ant-design-vue';
import LibrarySelection from '@/components/LibrarySearchView/LibrarySelection.vue'
import LibraryResultList from '@/components/LibrarySearchView/LibraryResultList.vue'
import { onMounted } from 'vue'
import { getLibraryInfoByRegion } from '@/apis/books.ts'
import type { LibraryResult } from '@/types/library/library.types.ts'
import Pagination from '@/components/common/Pagination.vue'

const value = ref('ascend');
const options = ref<SelectProps['options']>([
  {
    value: 'ascend',
    label: '오름차순',
  },
  {
    value: 'descend',
    label: '내림차순',
  },
]);

const resultList = ref<LibraryResult['libs']>([]);
const responseData = ref<LibraryResult>();
const currentPage = ref(1);

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const { regionCode } = inject('region');

const fetchData = async () => {
  try {
    const data: LibraryResult = await getLibraryInfoByRegion(regionCode.value, currentPage.value);
    responseData.value = data;
    resultList.value = data.libs;
    console.log(data);
  } catch (error) {
    console.error('API 요청 실패:', error);
  }
};

const handleChangePage = async (value: number) => {
  resultList.value = [];
  currentPage.value = value;
  await fetchData();
}

onMounted(() => {
  fetchData();
});

watch(regionCode, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    resultList.value = [];
    responseData.value = {
      pageSize : 1,
      pageNo : 1,
      numFound : 0,
      resultNum: 0,
      libs : [],
    };
    fetchData();
  }
});
</script>

<template>
  <div class="layout">
    <LibrarySelection/>
    <div class="result-wrapper">
      <div class="input-wrapper">
        <a-config-provider
          :theme="{
              token: {
                colorPrimary: '#6472FC',
              },
            }"
        >
          <a-select
            ref="select"
            v-model:value="value"
            style="width: 150px"
            :options="options"
            @change="handleChange"
            size="large"
          ></a-select>
        </a-config-provider>
      </div>
      <div class="search-result-wrapper">
        <LibraryResultList
          v-for='item in resultList'
          :key="item.lib.libInfo.libCode"
          :address="item.lib.libInfo.address"
          :homepage="item.lib.libInfo.homepage"
          :lib-code="item.lib.libInfo.libCode"
          :lib-name="item.lib.libInfo.libName"
        />
      </div>
      <div class="pagination-wrapper">
        <Pagination
          :current="currentPage"
          :total="responseData?.numFound"
          :page-size="responseData?.pageSize"
          @update:current="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  width: 936px;
  height: 1120px;
}

.result-wrapper {
  margin-top : 25px;
  height: 962px;
  width: 936px;
}

.input-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 936px;
  height: 40px;
}

.search-box {
  width: 300px;
}

.search-result-wrapper {
  display: grid;
  gap : 8px;
  width: 936px;
  height: 752px;
  margin-top: 16px;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top : 110px;
  width: 936px;
}
</style>
