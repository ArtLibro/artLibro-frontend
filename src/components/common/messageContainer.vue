<template>
  <div class="message-item-container" v-if="isOpen">
    <div class="message-item-header">
      <p>읽지 않은 메세지</p>
    </div>

    <div class="message-item-list">
      <div class="message-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="message-item-image">

        <div class="message-item-content">
          <div class="message-item-content-header">
            <p class="message-item-name">김철수</p>
            <p class="message-item-date">2025-02-01</p>
          </div>
          <p class="message-item-description">안녕하세요</p>
        </div>
      </div>

      <div class="message-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="message-item-image">

        <div class="message-item-content">
          <div class="message-item-content-header">
            <p class="message-item-name">김철수</p>
            <p class="message-item-date">2025-02-01</p>
          </div>
          <p class="message-item-description">안녕하세요</p>
        </div>
      </div>

      <div class="message-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="message-item-image">

        <div class="message-item-content">
          <div class="message-item-content-header">
            <p class="message-item-name">김철수</p>
            <p class="message-item-date">2025-02-01</p>
          </div>
          <p class="message-item-description">안녕하세요</p>
        </div>
      </div>
      <div class="message-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="message-item-image">

        <div class="message-item-content">
          <div class="message-item-content-header">
            <p class="message-item-name">김철수</p>
            <p class="message-item-date">2025-02-01</p>
          </div>
          <p class="message-item-description">안녕하세요</p>
        </div>
      </div>
      <div class="message-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="message-item-image">

        <div class="message-item-content">
          <div class="message-item-content-header">
            <p class="message-item-name">김철수</p>
            <p class="message-item-date">2025-02-01</p>
          </div>
          <p class="message-item-description">안녕하세요</p>
        </div>
      </div>
      <div class="message-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="message-item-image">

        <div class="message-item-content">
          <div class="message-item-content-header">
            <p class="message-item-name">김철수</p>
            <p class="message-item-date">2025-02-01</p>
          </div>
          <p class="message-item-description">안녕하세요</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isOpen } = defineProps<{
  isOpen: boolean;
}>();
</script>

<style lang="scss" scoped>
.message-item-container {
  width: 250px;
  height: 300px;
  border: 1px solid #D3D0CB;
  border-radius: 10px;
  position: absolute;
  top: 130%;
  left: 50%;
  z-index: 10000000;
  transform: translateX(-50%);
  background-color: #fff;

  .message-item-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    background-color: #333333;
    border-radius: 10px 10px 0 0;

    p {
      color: #fff;
      font-size: 13px;
      letter-spacing: -0.02em;
    }
  }

  .message-item-list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem 1rem;
    height: 90%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    .message-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      padding-bottom: .5rem;
      border-bottom: 1px solid #D3D0CB;


      .message-item-image {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }

      .message-item-content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        width: 80%;

        .message-item-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.2rem;

          .message-item-name {
            font-size: 13px;
            color: #5c5c5c;
          }

          .message-item-date {
            font-size: 11px;
            color: #a7a7a7;
          }
        }

        .message-item-description {
          font-size: 12px;
          color: #838383;
        }
      }
    }
  }

}
</style>
