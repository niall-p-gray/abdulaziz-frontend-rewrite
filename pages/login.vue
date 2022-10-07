<template>
  <div class="wrapper">
    <form>
      <img src="~/assets/logo.svg" alt="Howdy Kolache" />
      <h1 class="heading">Howdy Kolache Admin</h1>
      <div class="input-wrapper">
        <img src="~/assets/icons/unlock.png" class="w-6 h-6" />
        <input type="password" placeholder="Password" />
      </div>
      <p class="error">Incorrect password</p>
      <button type="submit" class="btn mt-12">Enter</button>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
    @apply h-screen mt-40 p-3;
}

form {
    @apply w-full md:w-6/12 lg:w-3/12 mx-auto flex flex-col justify-center items-center;
}

.heading {
    @apply font-bold text-3xl mt-4;
}

.input-wrapper {
    @apply flex items-center p-2 border-b border-gray-500 w-full mt-16;
}

.input-wrapper input{
    @apply bg-transparent ml-2 text-base p-0;
}

.error{
    @apply text-red-500 mt-2 w-full;
}

.btn{
    @apply w-full md:w-auto;
}
</style>
