<template>
  <div class="user-card-wrap">
    <div class="user-card-header">
      <img src="/images/user-dummy.png" alt="유저 이미지" class="user-image">
      <div class="user-card-header-info">
        <p class="user-name">홍길동 님</p>
        <p class="user-image-upload">이미지 업로드</p>
      </div>
    </div>

    <div class="user-card-body">
      <p class="user-info-title">이름</p>
      <div class="user-info-content">
        <span>홍길동</span>
        <button>수정</button>
      </div>
      <p class="user-info-title">이메일</p>
      <div class="user-info-content">
        <span>example@naver.com</span>
        <button>수정</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.user-card-wrap {

  .user-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 23px;

    .user-image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }

    .user-card-header-info {
      text-align: right;

      .user-name {
        font-size: 28px;
        margin-bottom: 12px;
        color: #222;
      }

      .user-image-upload {
        font-size: 12px;
        padding: .5rem 1rem;
        background-color: #F0EFFA;
        display: inline-block;
        border-radius: 12px;
      }
    }
  }

  .user-card-body {
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
    padding: 18px 16px;
    margin-bottom: 23px;

    .user-info-title {
      margin-bottom: 10px;
      font-size: 12px;
      color: #434343;
    }

    .user-info-content {
      width: 100%;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-size: 14px;
        color: #434343;
      }

      button {
        font-size: 12px;
        color: #fff;
        background-color: $secondary-color-300;
        padding: 4px 18px;
        border-radius: 12px;
        border: none;
      }
    }
  }

}
</style>
