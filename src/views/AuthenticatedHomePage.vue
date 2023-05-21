<template>
  <div class="container">
    <div class="inner-container">
      <div class="left-side">
        <!-- Heading and description -->
        <h1>Premium Video Calling.<br />Free for everyone.</h1>
        <p class="description">
          We've redesigned our secure business meeting service, Google Meet, so
          that everyone can use it for free.
        </p>

        <!-- Buttons for creating and joining meetings -->
        <div class="buttons">
          <NewMeetingButton />
          <JoinMeetingButton />
        </div>

        <!-- Separator and about link -->
        <hr class="separator" />
        <span>
          <a class="about-me" href="#">More about me</a>
        </span>
      </div>
      <div class="right-side">
        <CarouselComponent />
      </div>
    </div>
  </div>
</template>

<script>
import CarouselComponent from '@/Authenticated/CarouselComponent.vue'
import NewMeetingButton from '@/Authenticated/NewMeetingButton.vue'
import JoinMeetingButton from '@/Authenticated/JoinMeetingButton.vue'

export default {
  name: 'AuthenticatedHomePage',
  components: {
    CarouselComponent,
    NewMeetingButton,
    JoinMeetingButton
  }
}
</script>

<style scoped>
.container {
  height: calc(100vh - 10rem);
  min-height: 100%;
  width: 100vw;
  overflow-y: auto;
  font-size: 1rem;
}

.inner-container {
  align-items: center;
  display: inline-flex;
  justify-content: space-evenly;
  min-height: 100%;
  width: 100vw;
}

.left-side {
  display: inline-flex;
  flex-basis: 35rem;
  flex-direction: column;
  flex-shrink: 1;
  margin-left: -10rem;
}

.left-side h1 {
  font-family: "Google Sans Display", Roboto, Arial, sans-serif;
  line-height: 3.25rem;
  font-size: 2.75rem;
  letter-spacing: 0;
  font-weight: 400;
  padding-bottom: 0;
  margin-bottom: 0;
}

.description {
  max-width: 50%;
  text-align: justify;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  line-height: 1.5rem;
  font-size: 1.125rem;
  letter-spacing: 0;
  font-weight: 400;
  color: rgb(95, 99, 104);
  max-width: 30rem;
  padding-bottom: 2em;
}

.separator {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  margin-left: 0;
  border: 1px solid rgb(218, 220, 224);
}
.about-me {
  color: #409eff;
  text-decoration: none;
  font-family: Roboto, Arial, sans-serif;
  line-height: 1.5rem;
  font-size: 1rem;
  letter-spacing: .00625em;
  font-weight: 400;
}
.about-me:active, .about-me:hover {
    text-decoration: underline;
}
.buttons {
  display: flex;
  gap: 1rem;
}
</style>
