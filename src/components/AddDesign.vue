<template>
  <base-wrapper :class="'wrapper--edit'">
    <button class="back-btn" @click="$router.push('/show')"></button>
    <form
      action="#"
      class="design-form"
      @dragover.prevent="dragover"
      @dragleave="dragleave"
      @drop.prevent="drop"
    >
      <div class="inputs-container">
        <input
          type="checkbox"
          class="design-form__published"
          id="published"
          v-model.trim="designItem.published"
        />
        <label class="design-form__published-switcher" for="published"></label>
        <span
          class="design-form__published-desc"
          :class="{
            'design-form__published-desc--green': designItem.published,
          }"
          >{{ isPublished }}</span
        >
        <ul class="design-form__uploaded-preview-list">
          <li
            class="preview"
            v-for="(item, ind) in designItem.previewImgs"
            :key="item.src"
          >
            <img
              class="preview__img"
              :src="item.src"
              :alt="'Design preview file#' + ind"
              :title="item.name"
            />
            <button
              class="del-btn del-btn--hover"
              type="button"
              title="Видалити файл"
              @click="removePic(designItem.previewImgs.indexOf(item))"
            ></button>
          </li>
          <label
            for="previewImgs"
            class="design-form__drag-drop-area"
            :class="{
              'design-form__drag-drop-area--filled':
                designItem.previewImgs.length > 0,
              invalid: validationMsgs.previewImgs.isMsgActive,
            }"
          >
          </label>
        </ul>
        <input
          class="design-form__input"
          type="file"
          id="previewImgs"
          accept="image/*"
          multiple
          @change="onChange"
        />
        <span
          class="warn-msg"
          :class="{
            'warn-msg--active': validationMsgs.previewImgs.isMsgActive,
          }"
          >{{ validationMsgs.previewImgs.msg }}</span
        >
        <input
          type="text"
          class="design-form__id"
          placeholder="###"
          id="id"
          required
          :class="{ invalid: validationMsgs.id.isMsgActive }"
          v-model.trim="designItem.id"
          @change="checkInput('id')"
        />
        <input
          type="text"
          class="design-form__title"
          id="title"
          placeholder="Назва дизайну"
          required
          :class="{ invalid: validationMsgs.title.isMsgActive }"
          v-model.trim="designItem.title"
          @change="checkInput('title')"
        />
        <span
          class="warn-msg warn-msg--half"
          :class="{ 'warn-msg--active': validationMsgs.id.isMsgActive }"
          >{{ idInvalidMsg }}</span
        >
        <span
          class="warn-msg warn-msg--half"
          :class="{ 'warn-msg--active': validationMsgs.title.isMsgActive }"
          >{{ validationMsgs.title.msg }}</span
        >
        <input
          type="url"
          class="design-form__link"
          id="link"
          placeholder="https://design###.horoshop.ua/"
          required
          :class="{ invalid: validationMsgs.link.isMsgActive }"
          v-model.trim="designItem.link"
          @change="checkInput('link')"
        />
        <span
          class="warn-msg"
          :class="{ 'warn-msg--active': validationMsgs.link.isMsgActive }"
          >{{ validationMsgs.link.msg }}</span
        >

        <ul
          class="design-form__uploaded-file-list"
          v-if="designItem.previewImgs.length"
          v-cloak
        >
          <li
            class="uploaded-file"
            v-for="(file, index) in designItem.previewImgs"
            :key="file + index"
          >
            <span class="uploaded-file__name" v-clipboard="file.name">{{
              file.name
            }}</span>
            <button
              class="del-btn"
              type="button"
              title="Видалити файл"
              @click="removePic(designItem.previewImgs.indexOf(file))"
            ></button>
          </li>
        </ul>
        <label for="previewImgs" class="design-form__file-input">
          Перетягніть файл або <span>виберіть на диску</span>
        </label>
      </div>
      <div class="btns-container">
        <base-btn
          type="button"
          :class="'btn--del'"
          @click.prevent="removeDesignItem"
          :disabled="this.isAddingMode"
          >Видалити</base-btn
        >
        <base-btn type="submit" @click="save" :disabled="!readyForSubmit"
          >Зберегти і вийти</base-btn
        >
      </div>
    </form>
  </base-wrapper>
</template>

<script>
export default {
  inject: ["designsBase"],
  data() {
    return {
      designItem: {
        previewImgs: [],
        title: "",
        link: "",
        id: "",
        published: false,
      },
      validationMsgs: {
        previewImgs: {
          msg: `Додайте прев'ю макету дизайну.`,
          isMsgActive: false,
        },
        title: {
          msg: "Введіть назву дизайну.",
          isMsgActive: false,
        },
        link: {
          msg: "Введіть посилання на дизайн.",
          isMsgActive: false,
        },
        id: {
          msg: "Введіть ID-номер дизайну.",
          isMsgActive: false,
        },
      },
      idIsFree: false,
      isAddingMode: true,
      currentDesignIndex: null,
      designId: null,
    };
  },
  methods: {
    onChange(event) {
      for (let index = 0; index < event.target.files.length; index++) {
        let newPic = { src: "", name: "" };
        newPic.src = URL.createObjectURL(event.target.files[index]);
        newPic.name = event.target.files[index].name;
        this.designItem.previewImgs.push(newPic);
      }
      this.checkInput("previewImgs");
    },
    dragover(event) {
      event.currentTarget.classList.add("design-form--green");
    },
    dragleave(event) {
      event.currentTarget.classList.remove("design-form--green");
    },
    drop(event) {
      for (let index = 0; index < event.dataTransfer.files.length; index++) {
        let newPic = { src: "", name: "" };
        newPic.src = URL.createObjectURL(event.dataTransfer.files[index]);
        newPic.name = event.dataTransfer.files[index].name;
        this.designItem.previewImgs.push(newPic);
      }
      this.checkInput("previewImgs");
      event.currentTarget.classList.remove("design-form--green");
    },
    checkInput(item) {
      if (this.designItem[item].length == 0) {
        this.validationMsgs[item].isMsgActive = true;
      } else {
        this.validationMsgs[item].isMsgActive = false;
        item == "id" ? this.checkId() : "";
      }
    },
    checkId() {
      if (this.designId == this.designItem.id) {
        this.idIsFree = true;
        this.linkAutoFill();
      } else if (
        this.designsBase.find((item) => item.id == this.designItem.id)
      ) {
        this.idIsFree = false;
        this.validationMsgs.id.isMsgActive = true;
      } else {
        this.idIsFree = true;
        this.linkAutoFill();
      }
    },
    linkAutoFill() {
      this.designItem.link = `https://design${this.designItem.id}.horoshop.ua/`;
    },
    save() {
      if (!this.isAddingMode) {
        this.designsBase[this.currentDesignIndex] = { ...this.designItem };
      } else {
        this.designsBase.push(this.designItem);
      }
      this.$router.push("/show");
    },
    removePic(index) {
      this.designItem.previewImgs.splice(index, 1);
      this.checkInput("previewImgs");
    },
    removeDesignItem() {
      this.designsBase.splice(this.currentDesignIndex, 1);
      this.$router.push("/show");
    },
  },
  computed: {
    isPublished() {
      return this.designItem.published ? "Oпублікований" : "Неопублікований";
    },
    idInvalidMsg() {
      if (this.idIsFree || this.designItem.id == "") {
        return "Введіть ID-номер дизайну.";
      } else {
        return `Введений ID-номер вже у вжитку.`;
      }
    },
    readyForSubmit() {
      if (this.idIsFree) {
        if (
          this.designItem.previewImgs.length > 0 &&
          this.designItem.title.length > 0 &&
          this.designItem.link.length > 0 &&
          this.designItem.id.length > 0
        ) {
          return true;
        }
        return false;
      }
      return false;
    },
  },
  created() {
    this.designId = this.$route.params.designId;
    this.isAddingMode = !this.designId;
    if (this.designId) {
      for (let index = 0; index < this.designsBase.length; index++) {
        if (this.designId == this.designsBase[index].id) {
          this.designItem = { ...this.designsBase[index] };
          this.designItem.previewImgs = [
            ...this.designsBase[index].previewImgs,
          ];
          this.currentDesignIndex = index;
        }
      }
    }
    this.checkId();
  },
};
</script>

<style lang="scss" scoped>
.design-form {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;

  &__published {
    display: none;

    &:checked + .design-form__published-switcher {
      background: #7ab10e;
      padding-left: 42px;
    }
  }

  &__published-switcher {
    background: rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 14px;
    cursor: pointer;
    height: 24px;
    transition: 0.3s ease;
    padding: 2px;
    width: 64px;

    &::before {
      display: inline-block;
      content: "";
      width: 20px;
      height: 20px;
      background: #ffffff;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
      border-radius: 14px;
    }
  }

  &__published-desc {
    align-items: center;
    display: flex;
    font-size: 14px;
    line-height: 18px;
    margin-left: 10px;
    transition: 0.3s ease;

    &--green {
      color: #699707;
    }
  }

  &__uploaded-preview-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    list-style-type: none;
    margin-bottom: 0;
    padding: 0;
    width: 100%;
  }

  &__drag-drop-area {
    background: url("../assets/dragdrop-img.svg") no-repeat center;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-top: 32px;
    min-height: 120px;
    transition: 0.3s ease;
    width: 100%;

    &--filled {
      background: url("../assets/add-icon.svg") no-repeat center;
      width: 120px;
      height: 12px;
      margin: 0;
    }
  }

  &--green &__drag-drop-area,
  &--green &__file-input {
    background-color: rgba(122, 177, 14, 0.24);
  }

  &__file-input {
    background: #ffffff;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.2);
    margin-top: 40px;
    padding: 6px 11px;
    text-align: center;
    transition: 0.3 ease;
    width: 100%;

    span {
      color: #418af2;
    }
  }

  &__input {
    display: none;
  }

  &__uploaded-file-list {
    list-style-type: none;
    margin: 0;
    padding: 24px 0 16px;
    width: 100%;
  }

  &__id,
  &__title,
  &__link {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    display: inline-block;
    margin-top: 40px;
    padding: 6px 11px;
    font-size: 14px;
    line-height: 20px;
  }

  &__id {
    margin-right: 11px;
    width: 10%;
  }

  &__title {
    flex-grow: 1;
    min-width: 50%;
  }

  &__link {
    width: 100%;
  }
}

.preview {
  align-items: flex-start;
  align-self: flex-start;
  display: flex;
  max-width: 120px;
  position: relative;

  &__img {
    width: 100%;
    height: auto;
  }
}

.uploaded-file {
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
  color: #418af2;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
  padding: 6px 11px;

  &::before {
    background-position: center;
    background: url("../assets/img-icon.svg") no-repeat;
    content: "";
    display: inline-block;
    height: 12px;
    margin-right: 8px;
    width: 14px;
  }

  &__name {
    &:hover::after {
      background-position: center;
      background: url("../assets/copy-icon.svg") no-repeat;
      content: "";
      display: inline-block;
      height: 12px;
      margin-left: 8px;
      width: 14px;
    }
  }
}

input,
label {
  &.invalid {
    border-color: red;
    border-width: 2px;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
}

.del-btn {
  align-items: center;
  background: url(../assets/del-btn.svg) no-repeat center;
  border: none;
  cursor: pointer;
  height: 24px;
  margin-left: auto;
  padding-top: 2px;
  transition: 0.3s ease;
  width: 24px;

  &--hover {
    background: url(../assets/del-btn-white.svg) no-repeat center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    bottom: 3px;
    opacity: 0;
    position: absolute;
    right: 3px;
  }

  .preview:hover &--hover {
    opacity: 1;
  }
}

.inputs-container {
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

.btns-container {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
}

.warn-msg {
  box-sizing: border-box;
  color: red;
  background: rgba(250, 0, 0, 0.1);
  padding: 0 11px;
  text-align: center;
  width: 100%;
  line-height: 30px;
  height: 0;
  overflow: hidden;
  transition: 0.3s ease;
  transition-delay: 250ms;

  &--active {
    height: 30px;
  }

  &--half {
    flex-grow: 1;
    flex-basis: 48%;
  }

  & + & {
    margin-left: 4%;
  }
}

.back-btn {
  background: url("../assets/back.png");
  background-size: cover;
  cursor: pointer;
  border: none;
  display: inline-block;
  height: 16px;
  left: 37px;
  position: absolute;
  top: 30px;
  width: 16px;
}
</style>