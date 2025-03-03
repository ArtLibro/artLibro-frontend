<template>
  <section class="content-container">
    <div class="content-box">
      <div class="content-header">
        <div class="user-profile">
          <img src="/images/user-dummy.png" alt="유저 프로필" class="profile-image" />
          <div>
            <h3 class="username">홍길동</h3>
          </div>
        </div>
        <div class="content-meta">
          <h2 class="content-title">감동적인 연극, ‘푸르른 날에’ 후기</h2>
          <span class="category">공연/행사</span>
          <span class="post-date">2025-02-02</span>
        </div>
      </div>

      <div class="book-image">
        <img src="/images/book-dummy.jpg" alt="사용자 리뷰 이미지" />
      </div>

      <div class="review-container">
        <div class="review-text">
          <p>
            기욤 뮈소의 아홉 번째 소설인『천사의 부름』은 작가의 변신을 널리 알리는 작품인 동시에
            어떤 소재를 다루든 빼어나게 재미있고, 감동적인 소설을 쓸 수 있는 작가의 재능을 유감없이
            보여준 수작이다. 기존에 출간된 그의 소설 중에서 판타지와 스릴러가 가미된 작품은 여럿
            있었지만《천사의 부름》만큼 작품 전체를 관통하는 스릴러는 없었다. 이 소설에서 기욤
            뮈소는 트레이드마크인 감동 코드를 한층 강화하고, 시종 긴장의 끈을 늦출 수 없게 만드는
            스릴러적 요소를 덧붙여 전혀 새로운 스타일의 소설을 선보인다. 기욤 뮈소의 변신은
            성공적이었고, 그의 작가 인생에서 매우 중요한 커리어를 한 가지 더 쌓는 성과를 거두었다.
            레고 블록을 맞추듯 독특한 각본을 짜고, 뛰어난 카우보이가 말을 능수능란하게 다루듯 시간과
            공간의 개념을 자유자재로 다룬다. 그는 보편적인 소재들, 그리고 보통 사람들이 지닌 열망,
            취향....
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.content-container {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-box {
  width: 1237px;
  height: 491px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.content-header {
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
}

.user-profile {
  width: 116px;
  height: 41px;
  background-color: $primary-color-100;
  display: flex;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.profile-image {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-size: 16px;
  color: $text-color-600;
  font-weight: normal;
  margin: 0;
}

.content-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.content-title {
  font-size: $text-size-500;
  font-weight: bold;
  color: white;
  padding-left: 20px;
}

.category {
  font-size: 16px;
  font-weight: lighter;
  border-radius: 10px;
  color: white;
  padding-top: 20px;
  padding-left: 100px;
}

.post-date {
  font-size: 16px;
  font-weight: lighter;
  color: white;
  padding-top: 20px;
  padding-left: 10px;
}

.book-image {
  position: absolute;
  top: 50px;
  right: 100px;
  z-index: 2;
}

.book-image img {
  width: 220px;
  height: 320px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.review-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 411px;
  background: white;
  border-radius: 20px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
}

.review-text {
  width: 780px;
  height: 300px;
  flex: 1;
  font-size: $text-size-300;
  font-weight: lighter;
  line-height: 1.6;
  position: absolute;
  left: 70px;
}

.review-text p {
  margin: 0;
}
</style>
