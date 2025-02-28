<script setup lang="ts"></script>

<template>
  <div class="performaceInfo">
    <div class="poster"></div>
    <div class="post-info-container">
      <div class="title">메모리 대학로</div>
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
          <td class="post-info">2025.02.07 ~ 2025.02.29</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-time.svg" alt="시간" />
            <span>시간</span>
          </td>
          <td class="post-info">2시간</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-map.svg" alt="장소" />
            <span>장소</span>
          </td>
          <td class="post-info">후암스테이지 (후암스테이지 (구. 마라카 3관, 오씨어터))</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-actor.svg" alt="배우" />
            <span>배우</span>
          </td>
          <td class="post-info">배지원, 안동렬, 서동주, 이현아, 이수재, 정한, 이시은 등</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-ticket.svg" alt="가격" />
            <span>가격</span>
          </td>
          <td class="post-info">전석 15,000원</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-age.svg" alt="연령" />
            <span>연령</span>
          </td>
          <td class="post-info">만 11세 이상</td>
        </tr>
        <tr>
          <td class="post-info post-info-center">
            <img class="post-info-icon" src="/public/icons/stage-category.svg" alt="장르" />
            <span>장르</span>
          </td>
          <td class="post-info">뮤지컬</td>
        </tr>
      </table>
      <div class="ticket-title">티켓 구매하러 가기</div>
      <div class="ticket-box"></div>
      <div class="ticket-box"></div>
      <div class="ticket-box"></div>
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
  background-color: beige;
}

.post-info-container {
  flex: 1;
  margin-left: 26px;
}

.title {
  font-size: 32px;
  font-weight: 400;
  margin-bottom: 21px;
  margin-top: 8px;
}

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

.ticket-box {
  width: 119px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid $text-color-100;
  display: inline-block;
  margin-right: 10px;
}
</style>
