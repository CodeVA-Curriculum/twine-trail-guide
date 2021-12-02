<div class=''>
    <!-- TODO: tiled layout by difficulty -->
    <ul class='list columns is-multiline is-desktop is-centered'>
        <li class='list-item column is-flex'>
            <div class='card'>
                <div class='card-header heading is-size-6 p-3'>🔷 Easy</div>
                <div class='card-content content is-small'>
                    These trails are short and simple. They are good for novices or folks who don't have a lot of time to spend diving deep into a complicated topic.
                </div>
            </div>
        </li>
        <li class='list-item column is-flex'>
            <div class='card'>
                <div class='card-header heading is-size-6 p-3'>🔷🔷 Moderate</div>
                <div class='card-content  content is-small'>
                    These trails are longer and more involved. They are good beginners who want to create slightly more complex projects.
                </div>
            </div>
        </li>
        <li class='list-item column is-flex'>
            <div class='card'>
                <div class='card-header heading is-size-6 p-3'>🔷🔷🔷 Strenuous</div>
                <div class='card-content content is-small'>
                    These trails can be pretty complicated. They are good for experienced folks or beginners to who are willing to spend a little extra time.
                </div>
            </div>
        </li>
        <li class='list-item column is-flex'>
            <div class='card'>
                <div class='card-header heading is-size-6 p-3'>🔷🔷🔷🔷 Expert</div>
                <div class='card-content content is-small'>
                    These trails involve some advanced topics. They are good for folks who are comfortable with the basics of Twine and want to take on a challenge.
                </div>
            </div>
        </li>
    </ul>
    <div class="field search">
        <div class="control">
            <input bind:value="{searchTerm}" class="input" type="text" placeholder="Search in Trail titles...">
        </div>
    </div>
    <div class='has-text-centered'>
        <span class='scroll-link'><Fa icon={faChevronDown} size="3x" /></span>
        <!-- <hr> -->
    </div>
</div>