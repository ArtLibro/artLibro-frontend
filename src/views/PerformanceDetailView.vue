<script lang="ts" setup>
import PerformanceInfo from '@/components/performanceDetail/PerformanceInfo.vue'
import { ref } from 'vue'
import { Dayjs } from 'dayjs'
import PerformanceTab from '@/components/performanceDetail/PerformanceTab.vue'
const value = ref<Dayjs>()

const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value, mode)
}

const getMonths = (value: Dayjs) => {
  const localeData = value.localeData()
  const months = []
  for (let i = 0; i < 12; i++) {
    months.push(localeData.monthsShort(value.month(i)))
  }
  return months
}

const getYears = (value: Dayjs) => {
  const year = value.year()
  const years = []
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i)
  }
  return years
}
</script>

<template>
  <div class="layout">
    <div class="poster-container">
      <PerformanceInfo />
      <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px">
        <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange">
          <template #headerRender="{ value: current, type, onChange, onTypeChange }">
            <div style="padding: 10px">
              <div style="margin-bottom: 10px">Custom header</div>
              <a-row type="flex" justify="space-between">
                <a-col>
                  <a-radio-group
                    size="small"
                    :value="type"
                    @change="(e) => onTypeChange(e.target.value)"
                  >
                    <a-radio-button value="month">Month</a-radio-button>
                    <a-radio-button value="year">Year</a-radio-button>
                  </a-radio-group>
                </a-col>
                <a-col>
                  <a-select
                    size="small"
                    :dropdown-match-select-width="false"
                    class="my-year-select"
                    :value="String(current.year())"
                    @change="
                      (newYear) => {
                        onChange(current.year(+newYear))
                      }
                    "
                  >
                    <a-select-option
                      v-for="val in getYears(current)"
                      :key="String(val)"
                      class="year-item"
                    >
                      {{ val }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col>
                  <a-select
                    size="small"
                    :dropdown-match-select-width="false"
                    :value="String(current.month())"
                    @change="
                      (selectedMonth) => {
                        onChange(current.month(parseInt(String(selectedMonth), 10)))
                      }
                    "
                  >
                    <a-select-option
                      v-for="(val, index) in getMonths(current)"
                      :key="String(index)"
                      class="month-item"
                    >
                      {{ val }}
                    </a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </div>
          </template>
        </a-calendar>
      </div>
    </div>
    <PerformanceTab />
    <div class="poster-detail-container">
      <div class="show-more">펼쳐보기</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  max-width: 1246px;
  margin: 0 auto;
}

.poster-container {
  display: flex;
  justify-content: space-between;
}

.poster-detail-container {
  width: 1042px;
  margin: 0 auto;
}

.show-more {
  width: 100%;
  height: 78px;
  border-radius: 6px;
  background: #f1f1ef;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
</style>
