<template>
  <div class="user-posts-container">
    <h3>작성한 게시글</h3>

    <div class="user-posts-contents">

      <div class="user-posts-content">
        <strong>히가시노 게이고 책 어떤가요</strong>
        <p>히가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요. 추리 소설을 좋아해서 한번 읽어볼까 고민중
          입니다.</p>
      </div>
      <div class="user-posts-content">
        <strong>히가시노 게이고 책 어떤가요</strong>
        <p>히가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요. 추리 소설을 좋아해서 한번 읽어볼까 고민중
          입니다.</p>
      </div>
      <div class="user-posts-content">
        <strong>히가시노 게이고 책 어떤가요</strong>
        <p>히가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요. 추리 소설을 좋아해서 한번 읽어볼까 고민중
          입니다.</p>
      </div>
      <div class="user-posts-content">
        <strong>히가시노 게이고 책 어떤가요</strong>
        <p>히가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요가시노 게이고 작가 책 읽어보신분 계신 가요? 읽을만 한지 모르겠네요. 추리 소설을 좋아해서 한번 읽어볼까 고민중
          입니다.</p>
      </div>

      <p class="user-posts-more">모든 글 보기</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.user-posts-container {
  h3 {
    font-size: 14px;
    color: #222;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .user-posts-contents {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .user-posts-content {
      width: 100%;
      padding: 10px 13px;
      border-radius: 10px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);

      strong {
        color: #413B89;
        margin-bottom: 10px;
        display: block;
      }

      p {
        font-size: 14px;
        color: #49454F;
        line-height: 18px;
        letter-spacing: 0.1px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

    }
  }

  .user-posts-more {
    font-size: 12px;
    color: rgba(193, 11, 14, .8);
    text-align: left;
    cursor: pointer;
  }
}
</style>
