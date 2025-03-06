<template>
  <div class="user-card-section">
    <div class="user-card-section-left user-card">
      <div class="user-card-container">
        <UserInfoCardContainer />
        <UserFollowContainer />
      </div>
    </div>

    <div class="user-card-section-right user-card">
      <div class="user-card-container">
        <UserLikedContainer />
        <UserPostsContainer />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserFollowContainer from './UserFollowContainer.vue';
import UserInfoCardContainer from './UserInfoCardContainer.vue';
import UserLikedContainer from './UserLikedContainer.vue';
import UserPostsContainer from './UserPostsContainer.vue';

</script>

<style lang="scss" scoped>
.user-card-section {
  width: 1050px;
  margin: 0 auto 56px;
  display: flex;
  gap: 1rem;

  .user-card {
    width: 50%;
    border-radius: 10px;
    border: 2px solid #EBEBEE;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.15);

    .user-card-container {
      width: 350px;
      height: 100%;
      margin: 0 auto;
      padding: 30px 0;


    }
  }

}
</style>
