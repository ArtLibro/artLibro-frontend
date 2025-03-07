<template>
  <div class="follower-container">

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>

    <div class="follower-item">
      <p class="follower-user-name">팔로워</p>
      <div class="follower-user-info-container">
        <span class="follower-user-info-status">온라인</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.follower-container {
  width: 100%;
  height: 240px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  .follower-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }

    .follower-user-name {
      font-size: 14px;
    }

    .follower-user-info-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .follower-user-info-status {
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
