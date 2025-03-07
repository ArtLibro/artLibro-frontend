<template>
  <div class="notification-item-container" v-if="isOpen">
    <div class="notification-item-header">
      <p>읽지 않은 알림</p>
    </div>

    <div class="notification-item-list">
      <div class="notification-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="notification-item-image">

        <div class="notification-item-content">
          <div class="notification-item-content-header">
            <p class="notification-item-name">김철수</p>
            <p class="notification-item-date">2025-02-01</p>
          </div>
          <p class="notification-item-description">안녕하세요</p>
        </div>
      </div>

      <div class="notification-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="notification-item-image">

        <div class="notification-item-content">
          <div class="notification-item-content-header">
            <p class="notification-item-name">김철수</p>
            <p class="notification-item-date">2025-02-01</p>
          </div>
          <p class="notification-item-description">안녕하세요</p>
        </div>
      </div>

      <div class="notification-item">
        <img src="/images/user-dummy.png" alt="user-dummy" class="notification-item-image">

        <div class="notification-item-content">
          <div class="notification-item-content-header">
            <p class="notification-item-name">김철수</p>
            <p class="notification-item-date">2025-02-01</p>
          </div>
          <p class="notification-item-description">안녕하세요</p>
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
.notification-item-container {
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

  .notification-item-header {
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

  .notification-item-list {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    padding: .5rem 1rem;
    height: 90%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;

    .notification-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      padding-bottom: .5rem;
      border-bottom: 1px solid #D3D0CB;


      .notification-item-image {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }

      .notification-item-content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        width: 80%;

        .notification-item-content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.2rem;

          .notification-item-name {
            font-size: 13px;
            color: #5c5c5c;
          }

          .notification-item-date {
            font-size: 11px;
            color: #a7a7a7;
          }
        }

        .notification-item-description {
          font-size: 12px;
          color: #838383;
        }
      }
    }
  }
}
</style>
