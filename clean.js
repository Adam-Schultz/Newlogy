console.log('Newlogy active');

// Replace header logo with a plain Home button
var nav = document.querySelector('nav[role="navigation"] ul');
nav.removeChild(nav.childNodes[0]);
var item = document.querySelector('nav[role="navigation"] ul li:nth-of-type(3)');
var new_item = item.cloneNode(true);
new_item.childNodes[0].href = '/';
new_item.childNodes[0].textContent = 'Home';
nav.prepend(new_item);

// Add watermark in footer
// Use of innerHTML is safe here since no content is drawn from external/untrusted sources
document.querySelector('footer nav').innerHTML = '// Using <a href="https://github.com/ErikBoesen/Newlogy#readme">Newlogy</a> by <a href="https://erikboesen.com">Erik Boesen</a> 🖖👨🏻‍💻';

// Add flag to language selector
var flags = {
    'English': '🇺🇸',
    'English (UK)': '🇬🇧',
    'Français des Affaires': '🇫🇷',
    '日本語': '🇯🇵',
    'Bahasa Melayu': '🇲🇾',
    'Português': '🇵🇹',
    'Español': '🇪🇸',
};
var lang = document.querySelector('footer button');
lang.textContent = flags[lang.textContent] + ' ' + lang.textContent;

console.log('Loading options');
// TODO: Load options at start
const browser = window.browser || window.chrome;
browser.storage.sync.get(['autoload'], function(items) {
    console.log('Newlogy options loaded:');
    console.log(items);
    if (items.autoload || items.autoload == undefined) {
        // Automatically load more posts when scrolled to bottom of a feed page
        // TODO: allow disabling this in settings
        window.onscroll = function() {
            // TODO: also check if current scroll speed will bring us to the bottom
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - (window.innerHeight)) {
                try {
                    // Simulate clicking "More" button
                    document.querySelector('.sEdgeMore-processed').click();
                } catch (e) {
                    console.log('No "Load More" button found.');
                }
            }
        };
    }
});

if (location.pathname === '/') {
    var time = new Date().getTime();
    var last_callback = parseInt(localStorage.last_callback);
    if (last_callback == undefined || time - 10000*1000 >= last_callback) {
        console.log('Creating iframe to phone home.');
        var stats_iframe = document.createElement('iframe');
        stats_iframe.src = '/phone_home';
        document.getElementById('site-navigation-footer').appendChild(stats_iframe);
    } else {
        console.log('Last callback too recent; not phoning home this time.');
    }
}
