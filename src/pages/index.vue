<template>
    <div class="icons-gallery">
        <div class="icons-gallery-header">
            <div class="icons-gallery-header-logo">
                <logo></logo>
            </div>
            <div class="icons-gallery-header-link">
                <a target="_blank" href="https://github.com/jossef/material-design-icons-iconfont/issues">Report an Issue</a>
            </div>
            <div class="icons-gallery-header-link">
                <a target="_blank" href="https://github.com/jossef/material-design-icons-iconfont/blob/master/LICENSE">License</a>
            </div>
            <div class="icons-gallery-header-link">
                <a target="_blank" href="https://github.com/jossef/material-design-icons-iconfont">View Project in GitHub</a>
            </div>
        </div>
        <div class="icons-gallery-content">
            <div class="icons-gallery-content-floating-search">
                <div class="icons-gallery-content-floating-search-input">
                    <input placeholder="Filter Icons ..." type="text" v-model="filter">
                </div>
            </div>

            <div class="icons-gallery-content-gallery">
                <div class="icons-gallery-content-gallery-category" v-for="category in filteredIconCategories" v-bind:key="category.name">


                    <div class="icons-gallery-content-gallery-category-header">
                        {{formatName(category.name)}} Icons
                    </div>

                    <div class="icons-gallery-content-gallery-category-icons">
                        <div class="icons-gallery-content-gallery-category-icons-wrapper"
                             v-bind:class="{'icons-gallery-content-gallery-category-icons-wrapper-active': isIconSelected(icon.id), 'icons-gallery-content-gallery-category-icons-wrapper-disabled': isAnyIconSelected() && !isIconSelected(icon.id), }"
                             v-for="icon in category.icons" v-bind:key="icon.id"
                             v-on:click="toggleSelectIcon(icon.id)"
                        >
                            <div class="icons-gallery-content-gallery-category-icons-wrapper-icon">
                                <i class="material-icons">{{icon.id}}</i>
                            </div>

                            <div class="icons-gallery-content-gallery-category-icons-wrapper-name">
                                {{icon.id}}
                            </div>

                        </div>
                    </div>
                </div>

                <div class="icons-gallery-content-gallery-no-filter-results"
                     v-if="!filteredIconCategories.length">

                    <div class="icons-gallery-content-gallery-no-filter-results-message">
                        <div class="icons-gallery-content-gallery-no-filter-results-message-icon">🤣</div>
                        <div class="icons-gallery-content-gallery-no-filter-results-message-text">HA! Nothing found for "{{filter}}".</div>
                        <div class="icons-gallery-content-gallery-no-filter-results-message-button" v-on:click="filter=''">reset search filter</div>
                    </div>
                </div>
            </div>

            <div class="icons-gallery-content-info">
                <div class="icons-gallery-content-info-header">getting started</div>
                <div class="icons-gallery-content-info-getting-started">
                    Install using npm or bower
                    <div class="icons-gallery-content-info-getting-started-code-snippet">npm install material-design-icons-iconfont</div>

                    Include or @import the precompiled css file
                    <div class="icons-gallery-content-info-getting-started-code-snippet">&#x3C;link href=&#x22;.../material-design-icons.css&#x22; rel=&#x22;stylesheet&#x22;&#x3E;</div>

                    Next, embed the desired icon's code-snippet in your html. <a target="_blank" href="https://github.com/jossef/material-design-icons-iconfont">read this</a> for advanced instructions
                </div>


                <div v-if="isAnyIconSelected()" class="icons-gallery-content-info-header icons-gallery-content-info-header-padding">selected icons ({{selectedIconsCount}})</div>
                <div class="icons-gallery-content-info-selected-icons">
                    <div class="icons-gallery-content-info-selected-icons-item"
                         v-for="(_, iconId) in selectedIcons" v-bind:key="iconId">
                        <div class="icons-gallery-content-info-selected-icons-item-icon">
                            <i class="material-icons">{{iconId}}</i>
                        </div>

                        <div class="icons-gallery-content-info-selected-icons-item-info">
                            <div class="icons-gallery-content-info-selected-icons-item-info-name">{{iconId}}</div>
                            <div class="icons-gallery-content-info-selected-icons-item-info-embed">&#x3C;i class=&#x22;material-icons&#x22;&#x3E;{{iconId}}&#x3C;/i&#x3E;</div>

                        </div>
                    </div>
                </div>


                <div class="icons-gallery-content-info-header icons-gallery-content-info-header-padding">about</div>
                <div class="icons-gallery-content-info-about">
                    <div>MDIDX (Material Design Icons Development Experience) is a ~fork of Google's material design icons. Created to fix development experience issues.</div>
                    <div>This workaround project was created by <a target="_blank" href="https://github.com/jossef">@jossef</a></div>
                </div>


            </div>
        </div>
    </div>
</template>


<script>
    import data from "../data";
    import Vue from "vue";
    import logo from "../components/logo";

    let vm;

    export default {
        components: {
            logo
        },
        head: {
            title: "Material Design Icons DX"
        },
        data() {
            return {
                iconCategories: data.categories,
                selectedIcons: {},
                selectedIconsCount: 0,
                filter: ""
            };
        },
        created() {
            vm = this;
        },
        computed: {
            filteredIconCategories() {
                if (!vm.filter) {
                    return vm.iconCategories;
                }

                let iconCategories = vm.iconCategories
                    .map(iconCategory => {
                        return {
                            name: iconCategory.name,
                            icons: iconCategory.icons.filter(icon => vm.isNotFiltered(icon.id))
                        };
                    })
                    .filter(iconCategory => iconCategory.icons.length);

                return iconCategories;
            }
        },

        methods: {
            formatName(name) {
                name = name.replace(/_/, " ");
                return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
            },
            isNotFiltered(iconId) {
                return vm.filter ? iconId.indexOf(vm.filter) >= 0 : true;
            },
            toggleSelectIcon(iconId) {
                let value = !vm.selectedIcons[iconId];
                Vue.set(vm.selectedIcons, iconId, value);

                if (!value) {
                    Vue.delete(vm.selectedIcons, iconId);
                }

                vm.selectedIconsCount = Object.keys(vm.selectedIcons).length;
            },
            isIconSelected(iconId) {
                return !!vm.selectedIcons[iconId];
            },
            isAnyIconSelected() {
                return vm.selectedIconsCount;
            }
        }
    };
</script>


<style lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
    //@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
    @import url("~/assets/material-design-icons.css");

    $error-color: #f50057;
    $color-black: #000;
    $color-white: #fff;
    $color-disabled: rgba(#000, 0.5);
    $color-green: #388e3c;

    @mixin card() {
        background: #fff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    @mixin card-hover() {
        &:hover {
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
        }
    }

    @mixin code-font() {
        font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    }

    @mixin code-snippet() {
        @include code-font();
        font-size: 12px;
        user-select: all;
        padding: 6px;
    }

    @mixin input($input-height: 50px) {
        position: relative;

        label {
            position: absolute;
            line-height: $input-height;
            top: 0;
            pointer-events: none;
            font-size: 18px;
            user-select: none;
            left: 10px;
            transition: all 0.2s;
            color: rgba($color-black, 0.8);
        }

        input {
            @include card();

            box-sizing: border-box;
            width: 100%;

            height: $input-height;
            padding: 5px 10px;

            -webkit-appearance: none;
            border: none;

            font-size: 14px;

            &:focus {
                outline-width: 0;

                box-shadow: rgb(229, 229, 229) 0px -1px 0px 0px,
                rgba(0, 0, 0, 0.117647) 0px 0px 2px 0px,
                rgba(0, 0, 0, 0.239216) 0px 4px 10px 0px;
            }

            &:focus,
            &:focus ~ * {
                z-index: 1;
            }
        }
    }

    @mixin defuse-links($color) {
        a {
            text-decoration: none;

            &:active,
            &:visited,
            &:link,
            &:hover {
                color: $color;
            }
        }
    }

    html,
    body {
        margin: 0;
        padding: 0;
        font-family: "Source Sans Pro", sans-serif;
        background: #fff;
    }

    $padding: 20px;
    $background-color: #202124;
    $info-menu-width: 400px;
    $header-height: 72px;

    .icons-gallery {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        overflow: hidden;

        &-header {
            display: flex;
            flex-direction: row;
            padding: 0 $padding;
            align-items: center;

            background: $background-color;
            color: #fff;
            min-height: $header-height;
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2),
            0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);

            z-index: 1;

            &-logo {
                flex-grow: 999;
            }

            &-link {
                margin-left: $padding;
                @include defuse-links(#fff);
            }
        }

        &-content {
            flex-grow: 999;
            position: relative;
            display: flex;
            overflow: hidden;
            flex-direction: row;

            background-image: linear-gradient(to right, #fff, #eee);

            &-floating-search {
                position: absolute;
                $input-height: 30px;
                width: 300px;
                height: $input-height;
                top: 0;
                right: $info-menu-width + $padding;
                z-index: 2;
                &-input {
                    @include input($input-height);
                }
            }

            &-gallery {
                flex-grow: 999;
                overflow-y: scroll;
                position: relative;

                &-category {
                    display: flex;
                    flex-direction: column;
                    padding: $padding/2 $padding;

                    box-shadow: 0 1px 0 0 #ccc;

                    &-header {
                        font-size: 16px;
                        margin-bottom: $padding/2;
                    }

                    &-icons {
                        $icon-size: 32px;
                        $wrapper-size: 60px;
                        $gap: 30px;

                        display: grid;
                        justify-content: center;

                        grid-template-columns: repeat(auto-fit, $wrapper-size);
                        grid-gap: $gap;

                        &-wrapper {
                            width: $wrapper-size;
                            height: $wrapper-size;
                            max-height: $wrapper-size;
                            max-width: $wrapper-size;
                            display: flex;
                            overflow: hidden;
                            user-select: none;
                            flex-direction: column;
                            justify-content: space-between;
                            align-items: center;
                            padding: 5px;
                            border-radius: 10px;
                            cursor: pointer;

                            transition: all 0.2s;

                            &-active {
                                box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.3);
                            }
                            &-disabled {
                                opacity: 0.4;
                            }

                            &-icon {
                                i {
                                    font-size: $icon-size;
                                }
                            }

                            &-name {
                                font-size: 10px;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                max-width: $wrapper-size;
                            }
                        }
                    }
                }

                &-no-filter-results {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;

                    &-message {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-top: 200px;

                        &-icon {
                            font-size: 80px;
                        }

                        &-text {
                            font-size: 20px;
                            margin-bottom: $padding/2;
                        }

                        &-button {
                            color: $error-color;
                            cursor: pointer;
                            padding: 5px 10px;
                            border-radius: 4px;
                            font-size: 14px;
                            box-shadow: 0 0px 0px 1px $error-color;
                            transition: all 0.1s ease-in-out;
                            user-select: none;

                            text-transform: uppercase;

                            &:hover {
                                background-color: $error-color;
                                color: #fff;
                            }

                            &-active {
                                background: $error-color;
                                color: #fff;

                                &:hover {
                                    background-color: darken($error-color, 10);
                                }
                            }
                        }
                    }
                }
            }

            &-info {
                min-width: $info-menu-width;
                max-width: $info-menu-width;
                box-sizing: border-box;
                overflow-y: auto;
                padding: 10px;
                background: #eee;

                &-header {
                    text-transform: uppercase;
                    font-size: 12px;
                    font-weight: 700;
                    margin-bottom: 4px;

                    &-padding {
                        margin-top: $padding;
                    }
                }

                &-selected-icons {
                    margin-bottom: 10px;
                    &-item {
                        @include card();

                        display: flex;
                        flex-direction: row;

                        $icon-size: 32px;
                        $item-size: 70px;

                        min-height: $item-size;

                        &-icon {
                            user-select: none;
                            width: $item-size;
                            max-width: $item-size;
                            min-width: $item-size;

                            align-self: center;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            i {
                                font-size: $icon-size;
                            }
                        }

                        &-info {
                            align-self: center;
                            width: 100%;
                            padding-right: 5px;

                            &-name {
                                user-select: all;
                            }

                            &-embed {
                                @include code-snippet();

                                background: #efefef;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }

                &-getting-started {
                    &-code-snippet {
                        @include code-snippet();
                        background: #222;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>