<template>
    <main class="home">
        <h1>Welcome to our support center</h1>
        <p>
            We are here to help! -------------<router-link :to="{name: 'faq'}">F.A.Q</router-link> ------------
             <router-link :to="{name: 'tickets'}">Send us a ticket</router-link>
        </p>
    </main>
</template>