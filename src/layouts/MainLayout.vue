<template>
    <div class="main_layout">
        <header class="main_header">
        <div class="main_header_wrapper">
            <img src="@/assets/logo.svg" class="main_header_logo" alt="Logo">
            <input type="checkbox" id="checkbox">
            <nav class="main_header_nav">
                <ul class="main_header_ul">
                    <li class="main_header_li"><a href="#" class="main_header_link">Home</a></li>
                    <li class="main_header_li"><a href="#" class="main_header_link">Home</a></li>
                    <li class="main_header_li"><a href="#" class="main_header_link">Home</a></li>
                    <li class="main_header_li"><a href="#" class="main_header_link">Home</a></li>
                </ul>
            </nav>
            <label for="checkbox">
                <i class="fa fa-bars main_header_icon"></i>
            </label>
        </div>
    </header>
        <router-view/>
    </div>
</template>