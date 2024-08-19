<script lang="ts">
    import SongCell from "../lib/SongCell.svelte";
    import { PlaylistSong } from "../PlaylistSong";
    import { PlaylistChangeType } from "../PlaylistChangeType";
    import Scroller from "swipe-scroller/Scroller.svelte";
    import { browser } from "$app/environment";
    import { onDestroy, onMount } from "svelte";
    import { Modal } from "flowbite-svelte";
    import Swiper from "$lib/Swiper.svelte";
    import appstoredark from "$lib/appstore-dark.svg";
    import iosmarketing from "$lib/marketing-ios.png";
    import andrmarketing from "$lib/marketing-android.png";
    import googleplaydark from "$lib/google-play-badge.png";
    var isDarkMode = false
    if (browser) {
        isDarkMode = window.matchMedia("(prefers-color-scheme: dark").matches
    }
    let openDownloadModal = false;
    const getRandomElement = (arr: any[]) =>
        arr[Math.floor(Math.random() * arr.length)];
    var songs: PlaylistSong[] = [];
    let songTitles = [
        "Thank you",
        "Built by paytondev",
        "Spotify soon!",
        "paytondeveloper@gmail.com",
        "Thanks, testers!",
    ];
    let songURLs = [
        {
            url: "https://paytondevme.github.io/pll/oobeimgs/appicon.png",
            hex: "#0c8a64",
        },
        {
            url: "https://paytondevme.github.io/pll/oobeimgs/thefakealbum.jpg",
            hex: "#75fb4c",
        },
        {
            url: "https://paytondevme.github.io/pll/oobeimgs/thefakealbum2.jpg",
            hex: "#9999f4",
        },
        {
            url: "https://paytondevme.github.io/pll/oobeimgs/thisismyapp.jpg",
            hex: "#a0cbc6",
        },
    ];
    for (let i = 0; i < 20; i++) {
        addRandSong();
    }
    function addRandSong() {
        const songURLInfo = getRandomElement(songURLs);
        songs = [
            ...songs,
            new PlaylistSong(
                getRandomElement(songTitles),
                "paytondev",
                `song${songs.length}`,
                songURLInfo.url,
                songURLInfo.hex,
            ),
        ];
    }
    let clear = 0;
    onMount(() => {
        clearInterval(clear);
        clear = setInterval(addRandSong, 3000);
    });
    onDestroy(() => {
        clearInterval(clear);
    });
    function handleDownloadClick() {
        openDownloadModal = true;
        if (browser) {
            document.body.classList.add("download-open");
        }
    }
</script>

<main>
    <div
        class="flex justify-center"
        style={openDownloadModal ? "overflow-y: hidden;" : ""}
    >
        <div class="text-center">
            <h1 class="font-semibold text-5xl md:text-9xl p-5 py-2">
                Playlistlist
            </h1>
            <h2 class="text-md md:text-xl">
                Keep track of playlist changes effortlessly.
            </h2>
            <Swiper>
                {#each songs as song}
                    <SongCell
                        {song}
                        changeType={getRandomElement([
                            PlaylistChangeType.added,
                            PlaylistChangeType.removed,
                        ])}
                    />
                {/each}
            </Swiper>
            <div id="pllbutton-container">
                <button on:click={handleDownloadClick} class="pllbutton">
                    <div class="flex">
                        Download Now
                        <span class="material-symbols-rounded">
                            arrow_forward
                        </span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</main>

<div id="bodycontent" class="md:flex md:flex-row justify-center">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
        <div class="sellingpoint">
            <h1 class="font-semibold text-3xl">How does it work?</h1>
            <p>
                About every hour, in the background, Playlistlist looks through
                your playlists and quietly logs any changes. Once you open the
                app, Playlistlist shows you these changes in a customizable,
                snappy interface. Playlistlist also features some analytics
                tools, like Charts, which plots your data in an
                easy-to-understand chart.
            </p>
        </div>
        <div class="sellingpoint">
            <h1 class="font-semibold text-3xl">What else can it do?</h1>
            <p>
                Playlistlist has several other features. Playlistlist Social
                lets you share your playlist changes with friends, and lets
                friends see your playlist changes. Playlistlist also has a home
                screen widget for quickly glancing at your most recent changes
                throughout the day. Optionally, Playlistlist offers iCloud
                Backup so that you can sync changes between devices and recover
                any lost data.
            </p>
        </div>
        <div class="sellingpoint">
            <h1 class="font-semibold text-3xl">
                Does it work with [platform]?
            </h1>
            <p>
                As of right now, Playlistlist is compatible with Apple Music and
                Spotify. Unfortunately, due to Spotify’s long review process,
                Spotify support is currently unavailable. Spotify support is
                implemented and functional, and once Spotify approves it, it’ll
                be available without an app update required. If you want to
                suggest a music provider, you can do so here.
            </p>
        </div>
        <div class="sellingpoint">
            <h1 class="font-semibold text-3xl">Playlistlist is Free</h1>
            <p>
                With Playlistlist 1.4 (available now), Playlistlist is 100% free. No subscriptions or purchases at all. Free users get all features.
            </p>
        </div>
    </div>
</div>

<Modal
    style="overflow-y:scroll; background-color: {isDarkMode ? "black" : "white"}"
    title="Download Playlistlist"
    bind:open={openDownloadModal}
    outsideclose
>
    <div class="md:flex md:items-center downloadmodal">
        <div class="p-2 pllios-container">
            <div
                id="dlpll-ios"
                class="border-solid border-2 border-slate-100 p-8 rounded-xl dlcontainer"
            >
                <h1 class="font-semibold text-xl">for iOS</h1>
                <h1 class="">Available now!</h1>
                <img
                    class="w-64"
                    alt="Download on the App Store"
                    src={iosmarketing}
                />
                <a
                    class="flex justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://apps.apple.com/us/app/playlistlist/id6468538844"
                >
                    <img
                        class="w-32 appstore-button"
                        alt="Download on the App Store"
                        src={appstoredark}
                    />
                </a>
            </div>
        </div>
        <div class="p-2 pllios-container">
            <div
                class="border-solid border-2 border-slate-100 p-8 rounded-xl dlcontainer"
            >
                <h1 class="font-semibold text-xl">for Android</h1>
                <h1 class="">Coming Soon</h1>
                <img
                    class="w-64"
                    alt="Download on the Play Store"
                    src={andrmarketing}
                />
                <a
                    class="flex justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    id=""
                >
                    <img
                        class="w-32 appstore-button"
                        alt="Download on the Play Store"
                        id="playstorebtn"
                        src={googleplaydark}
                    />
                </a>
            </div>
        </div>
    </div>
    <svelte:fragment slot="footer">
        <p>
            Google Play and the Google Play logo are trademarks of Google LLC.
            App Store and the Apple logo are trademarks of Apple Inc.
            Screenshots of Playlistlist for Android are preliminary and subject
            to change.
        </p>
    </svelte:fragment>
</Modal>

<style lang="postcss">
    .download-open {
        filter: brightness(20%);
    }
    #playstorebtn {
        opacity: 0.5;
    }
    .appstore-button {
        transition-duration: 0.2s;
    }
    .appstore-button:hover {
        opacity: 0.8;
    }
    .appstore-button:active {
        filter: brightness(40%);
    }
    .downloadmodal {
        padding: 12px;
    }
    .pllbutton {
        background-color: rgb(29, 109, 229);
        color: white;
        padding: 16px;
        border-radius: 500px;
        transition-duration: 0.2s;
    }
    .pllbutton:hover {
        background-color: rgb(19, 75, 160);
        color: white;
        padding: 16px;
        border-radius: 500px;
        box-shadow: 0px 6px 12px rgb(19, 75, 160);
    }
    .pllbutton:active {
        background-color: rgb(11, 38, 79);
        color: white;
        padding: 16px;
        border-radius: 500px;
        box-shadow: 0px 6px 6px rgb(19, 75, 160);
    }
    .downloadmodal {
        /* overflow: scroll; */
        overflow-y: scroll !important;
    }
    .sellingpoint {
        width: 70%;
        text-align: left;
    }
    .sellingpoints {
        width: 100vw;
    }
    #bodycontent {
        padding: 12px;
        padding-left: 5%;
    }
    @media (max-width: 767px) {
        .downloadmodal {
            height: 50vh;
        }
    }
</style>
