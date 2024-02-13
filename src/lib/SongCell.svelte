<script lang="ts">
    import type { PlaylistSong } from "../PlaylistSong";
    import mediaItemPlaceholder from "$lib/MediaItemPlaceholder.jpg";
    import { PlaylistChangeType } from "../PlaylistChangeType";
    export let song: PlaylistSong;
    export let changeType: PlaylistChangeType;
    const colorHex = song.colorHex || "#c9c9c9";
    function isColorDark(c: string): Boolean {
        var color: any = c;
        let r;
        let g;
        let b;
        // Check the format of the color, HEX or RGB?
        if (c.match(/^rgb/)) {
            // If HEX --> store the red, green, blue values in separate variables
            color = color.match(
                /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/,
            );

            r = color[1];
            g = color[2];
            b = color[3];
        } else {
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            color = +(
                "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
            );

            r = color >> 16;
            g = (color >> 8) & 255;
            b = color & 255;
        }
        let hsp;
        // HSP equation from http://alienryderflex.com/hsp.html
        hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

        // Using the HSP value, determine whether the color is light or dark
        return !(hsp > 127.5);
    }
</script>

<div class="p-2">
    <div style="--colorHex:{colorHex};" class="songcontainer rounded-3xl">
        <div class="flex p-3 justify-between">
            <div
                class="flex {changeType == PlaylistChangeType.added
                    ? 'song-added'
                    : 'song-removed'}"
            >
                {#if song.artworkURL == null}
                    <img
                        class="size-16 rounded-xl"
                        alt="album art placeholder"
                        src={mediaItemPlaceholder}
                    />
                {:else}
                    <img
                        class="size-16 rounded-xl"
                        alt={`${song.title} album art`}
                        src={song.artworkURL}
                    />
                {/if}
                <div class="px-2 py-1 text-left">
                    <h1
                        class="font-semibold {isColorDark(colorHex)
                            ? 'color-dark'
                            : 'color-light'}"
                    >
                        {song.title}
                    </h1>
                    <h2
                        class="font-thin {isColorDark(colorHex)
                            ? 'color-dark'
                            : 'color-light'}"
                    >
                        {song.artist}
                    </h2>
                </div>
            </div>
            <div class="changestatus flex items-center">
                {#if changeType != undefined}
                    {#if changeType == PlaylistChangeType.added}
                        <span class="material-symbols-rounded added">
                            add
                        </span>
                    {:else}
                        <span class="material-symbols-rounded removed">
                            remove
                        </span>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>

<style lang="postcss">
    .song-removed {
        opacity: 0.5;
    }
    .songcontainer {
        background-color: var(--colorHex);
        width: 450px;
        height: 87px;
    }
    .color-dark {
        color: white;
    }
    .color-light {
        color: black;
    }
    .added {
        color: theme(colors.green);
        font-size: 40px;
    }
    .removed {
        color: theme(colors.red);
        font-size: 40px;
    }
</style>
