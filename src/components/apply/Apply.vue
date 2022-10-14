<template>
  <h3 align="center">申请阅读权限</h3>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="reason"
        rows="5"
        autosize
        label="留言"
        type="textarea"
        maxlength="100"
        placeholder="可以告诉我你是谁，或者为什么你需要阅读权限"
        show-word-limit
        :rules="[{ required: true, message: '不输入留言没法审核通过哦' }]"
      />
      <van-field
        name="checkboxGroup"
        label="是否同意"
        :rules="[{ required: true, message: '别忘了发四' }]"
      >
        <template #input>
          <van-checkbox-group v-model="groupChecked" direction="horizontal">
            <van-checkbox name="1" shape="square"
              >我承诺不把账号给别人使用</van-checkbox
            >
          </van-checkbox-group>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getLoggedUser, login, UserRole, UserInfo } from '@/api';
import { Dialog } from '@/utils';

const router = useRouter();

const reason = ref('');

const groupChecked = ref([]);

let user: UserInfo | null = null;

onMounted(async () => {
  user = await getLoggedUser();
  if (!user) {
    await login();
  }
  if (!user) {
    return;
  }
  if (user.role === UserRole.Reader) {
    await Dialog.alert({
      title: '已经拥有阅读权限啦',
      message: '你可以去主页找找喜欢的课程',
    });
    router.replace('/');
  }
});

const onSubmit = async () => {
  const message = `user: ${user?.id}, reason: ${reason.value}`;
  await fetch(
    `https://api.day.app/JkKBmvPGW96hY3DxBrpM3A/新的阅读权限申请/${message}`
  );
  await Dialog.alert({
    title: '申请成功',
    message: '我们会尽快审核你的申请',
  });
  router.replace('/');
};
</script>
