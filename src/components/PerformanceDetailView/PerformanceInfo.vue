<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  prfnm: String,
  prfSchedule: {
    type: Array as PropType<string[]>,
    required: true,
  },
  fcltynm: String,
  prfruntime: String,
  prfcast: String,
  pcseguidance: String,
  prfage: String,
  genrenm: String,
  poster: String,
  relates: Object,
})
</script>

<template>
  <div class="performaceInfo">
    <img class="poster" :src="poster" />
    <div class="post-info-container">
      <div class="title">{{ prfnm }}</div>
      <!-- 태그 링크로 변경 -->
      <div class="homepage-link-btn">
        공식홈페이지 가기
        <img src="/public/icons/stage-home.svg" alt="홈페이지가기" style="margin-left: 5px" />
      </div>
      <table>
        <colgroup>
          <col style="width: 25%" />
          <col style="width: 75%" />
        </colgroup>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-calendar.svg" alt="일정" />
            <span>일정</span>
          </td>
          <td class="post-info">{{ prfSchedule[0] }} ~ {{ prfSchedule[1] }}</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-time.svg" alt="시간" />
            <span>시간</span>
          </td>
          <td class="post-info">{{ prfruntime }}</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-map.svg" alt="장소" />
            <span>장소</span>
          </td>
          <td class="post-info">
            <div class="post-info-overflow">{{ fcltynm }}</div>
          </td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-actor.svg" alt="배우" />
            <span>배우</span>
          </td>
          <td class="post-info">
            <div class="post-info-overflow">
              {{ prfcast }}
            </div>
          </td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-ticket.svg" alt="가격" />
            <span>가격</span>
          </td>
          <td class="post-info">{{ pcseguidance }}</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-age.svg" alt="연령" />
            <span>연령</span>
          </td>
          <td class="post-info">{{ prfage }}</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-category.svg" alt="장르" />
            <span>장르</span>
          </td>
          <td class="post-info">{{ genrenm }}</td>
        </tr>
      </table>
      <div class="ticket-title">티켓 구매하러 가기</div>
      <div class="ticket-container" v-if="relates?.relate?.length > 0">
        <a target="_blank" v-for="item in relates?.relate?.slice(0, 3)" class="ticket-link" :key="item.relatenm"
          :href="item.relateurl">{{ item.relatenm }}
        </a>
      </div>
      <!-- {{ relates }} -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.performaceInfo {
  width: 889px;
  height: 440px;
  border: 1px solid $text-color-100;
  border-radius: 8px;
  padding: 19px;
  box-sizing: border-box;
  display: flex;

  position: relative;
}

.poster {
  width: 281px;
  height: 400px;
  border-radius: 8px;
}

.post-info-container {
  flex: 1;
  margin-left: 26px;
}

.title {
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 21px;
  margin-top: 8px;
}

// v-for="item in relates?.relate?.slice(0, 3) || []"

.post-info {
  font-size: 18px;
  padding: 6px 0;
}

.post-info-center {
  display: flex;
  align-items: center;
}

.post-info-icon {
  width: 20px;
  height: 20px;
  margin-right: 13px;
  // display: inline-block;
}

.post-info-overflow {
  width: 450px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.homepage-link-btn {
  width: 176px;
  height: 47px;
  border-radius: 7px;
  border: 1px solid $primary-color-100;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 17px;
  position: absolute;
  top: 19px;
  right: 19px;
  color: $primary-color-100;
}

.ticket-title {
  font-size: 16px;
  margin-bottom: 19px;
  margin-top: 15px;
}

.ticket-container {
  display: flex;
  width: 430px;
}

.ticket-link {
  min-width: 119px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid $text-color-100;
  display: inline-block;
  margin-right: 10px;
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}

.ticket-link:nth-child(1)::before {
  content: '';
  display: block;
  width: 25px;
  height: 25px;
  background-image: url('/public/icons/ticket-blue.svg');
  background-size: cover;
  margin-right: 8px;
}

.ticket-link:nth-child(2)::before {
  content: '';
  display: block;
  width: 21px;
  height: 17px;
  background-image: url('/public/icons/ticket-red.svg');
  background-size: cover;
  margin-right: 8px;
}

.ticket-link:nth-child(3)::before {
  content: '';
  display: block;
  width: 21px;
  height: 17px;
  background-image: url('/public/icons/ticket-green.svg');
  background-size: cover;
  margin-right: 8px;
}
</style>
