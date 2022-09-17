<template>
    <div id="sortOptions" :class="[appData.sortOptions.active ? 'active' : 'inactive']">
        <div id="sortOverlay">
            <div id="closesortOverlay" class="cursor-pointer" @click="appData.toggleSortScreen()">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <h3 class="sub-title">Sorteren op</h3>
            <div class="sortOption" :class="{selected: appData.sortOptions.selected == 1}" @click="appData.sortOptions.selected = 1">
                <h4 class="sort-text"><i class="fa-solid fa-arrow-up-a-z"></i>Alfabetisch oplopend</h4>
                <i class="fa-solid fa-check text-gradient-green" v-if="appData.sortOneCondition"></i>
            </div>
            <div class="sortOption" :class="{selected: appData.sortOptions.selected == 2}" @click="appData.sortOptions.selected = 2">
                <h4 class="sort-text"><i class="fa-solid fa-arrow-down-z-a"></i>Alfabetisch aflopend</h4>
                <i class="fa-solid fa-check text-gradient-green" v-if="appData.sortTwoCondition"></i>
            </div>
            <div class="sortOption" :class="{selected: appData.sortOptions.selected == 3}" @click="appData.sortOptions.selected = 3">
                <h4 class="sort-text"><i class="fa-solid fa-arrow-up-9-1"></i>Numeriek oplopend</h4>
                <i class="fa-solid fa-check text-gradient-green" v-if="appData.sortThreeCondition"></i>
            </div>
            <div class="sortOption" :class="{selected: appData.sortOptions.selected == 4}" @click="appData.sortOptions.selected = 4">
                <h4 class="sort-text"><i class="fa-solid fa-arrow-down-1-9"></i>Numeriek aflopend</h4>
                <i class="fa-solid fa-check text-gradient-green" v-if="appData.sortFourCondition"></i>
            </div>
            <button type="button" class="btn-set" @click="appData.applySortingMethod()">Toepassen</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { pokemonStore } from '@/stores/appData';
const appData = pokemonStore();
</script>

<style scoped>
    /*------ sortOptions ------*/
#sortOptions{
    z-index: 1;
    position: fixed;
    display: flex;
    justify-content: center;
    height: 100%;
    width: inherit;
    top: 0;
    left: 0;
}

#sortOptions.active{
    background: rgba(0, 0, 0, 0.4);
    transition:background-color 1s;
    pointer-events:all;
}

#sortOptions.inactive{
    background: rgba(0, 0, 0, 0);
    transition:background-color 1s;
    pointer-events: none;
}

#sortOverlay{
    position: fixed;
    width: 100%;
    max-width: 375px;
    padding: 29px 16px 35px 13px;
    background: var(--white);
    border-radius: 20px 20px 0 0;
    transition: 0.5s;
}

#sortOptions.active #sortOverlay{
    bottom: 0;
    
}

#sortOptions.inactive #sortOverlay{
    bottom: -50%;
}

#closesortOverlay{
    z-index: 500;
    position: absolute;
    top: 12px;
    right: 16px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: var(--bg-close-btn);
}

#closesortOverlay:hover{
    background: black!important;
}

#closesortOverlay i{
    color: var(--white);
    height: fit-content;
    font-size: 11px;
}

#sortOverlay h3{
    margin-bottom: 12px;
    margin-left: 3px;
}

.sortOption{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    height: 40px;
    padding: 11px 14px 11px 16px;
    border-radius: 50em;
    box-sizing: border-box;
    background: var(--bg-sort-option);
}

.sortOption + .sortOption{
    margin-top: 10px;
}

#sortOverlay .selected{
    background: 
    linear-gradient(var(--bg-sort-option), var(--bg-sort-option)) padding-box,
    var(--gradient-green) border-box;
    border: 1px solid transparent;
}

.sort-text i{
    margin-right: 7px;
}

.btn-set{
    margin-left: 3px;
    margin-top: 25px;
}
</style>