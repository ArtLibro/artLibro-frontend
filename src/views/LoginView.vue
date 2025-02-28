<script lang="ts" setup>
import { ref } from "vue";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons-vue";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";

const address = ref<string>("");
const domain = ref<string>("@naver.com");
const password1 = ref<string>("");
const password2 = ref<string>("");
const userName = ref<string>("");

const value15 = ref<string>('Sign Up');


const visible = ref<boolean>(true);
</script>

<template>
  <div class="layout">
    <div class="logo">
      <img src="/icons/SignUp/logo.svg" />
    </div>

    <div class="input-group">
      <div style="margin-top: 65px;">
        <div>이메일 입력</div>

        <a-input-group compact>
          <a-auto-complete class="input" v-model:value="address" placeholder="Email" />
          <a-select class="input-mail" v-model:value="domain">
            <a-select-option value="naver">@naver.com</a-select-option>
            <a-select-option value="google">@google.com</a-select-option>
          </a-select>
        </a-input-group>


        <div class="input-text">비밀번호 입력</div>
        <a-input-password v-model:value="password1" placeholder="비밀번호를 입력해주세요" />
        <div class="small-text"> 영문 대·소문자/숫자.특수문자 중 2가지 이상 조합, 8~16글자 </div>

        <a-button type="primary" class="button">로그인</a-button>

      </div>

      <div style="margin-left: 91.19px; margin-top: 43px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="96" viewBox="0 0 2 96" fill="none">
          <path d="M1.0957 0L1.0957 96" stroke="#595959" stroke-opacity="0.5" />
        </svg>

        <div class="text">또는</div>

        <svg xmlns="http://www.w3.org/2000/svg" width="2" height="96" viewBox="0 0 2 96" fill="none">
          <path d="M1.0957 0L1.0957 96" stroke="#595959" stroke-opacity="0.5" />
        </svg>
      </div>

      <div class="social-signup">
        <img src="/icons/SignUp/kakao.svg" /> <br>
        <img style="margin-top: 11px;" src=" /icons/SignUp/naver.svg" /> <br>
        <img style="margin-top: 11px;" src="/icons/SignUp/google.svg" />
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 903px;
}

.logo {
  margin-top: 48px;
  margin-left: 512px;
}

.input-group {
  margin-left: 213px;
  margin-top: 54px;
  display: flex;

  .input-text {
    margin-top: 13px
  }

  .input {
    width: 191px;
    height: 36px;
  }

  .input-mail {
    width: 132px;
    height: 36px;
  }
}

.small-text {
  color: var(--gray-6, #bfbfbf);
  font-size: 10px
}

.button {
  width: 100px;
  margin-left: 220px;
  margin-top: 20px;
   background-color: #6472fc;
}

.text {
  color: rgba(25, 25, 25, 0.50);
  font-size: 14px; font-style: normal;
  margin-left: -10px;
}

.social-signup {
  margin-top: 60px;
  margin-left: 87.9px;
}
</style>
