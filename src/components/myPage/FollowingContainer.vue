<template>
  <div class="following-container">

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>

    <div class="following-item">
      <p class="following-user-name">팔로잉</p>
      <div class="following-user-info-container">
        <span class="following-user-info-status">온라인</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.following-container {
  width: 100%;
  height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  .following-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .following-user-name {
      font-size: 14px;
    }

    .following-user-info-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .following-user-info-status {
        font-size: 12px;
        color: #1F1F1F;
        background-color: #99FDD2;
        border-radius: 12px;
        padding: 6px 14px;
      }
    }
  }
}
</style>
