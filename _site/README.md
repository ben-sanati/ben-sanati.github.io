# Personal Webpage

## Notes

Basic configuration occurs in _config.yml. This contains site variables such as title, tagline, url, and repository address, as well as the author's name and email address for inclusion in blog posts. You can specify the path to an avatar for inclusion in the home (optional).

More advanced configuration requires altering some files that are not included in the demo template and are hidden in the original theme. There are three files you might want to customize. First, you could change icon links in _includes/particles-home.html and add/remove icons as needed. You may add icons that are not included in the theme by default. For more information on how to do this, see this post.

Second, you might want to edit the style variables specified in _sass/_variables.scss. These allow you to customize the theme's color scheme and typefaces. There are many resources on the web to learn the principles of good web design. I personally recommend Matthew Butterick's Practical Typography.

In addition to these files, you can customize favicons in the assets folder. For that, favicon.io is an excellent tool. You can also change the particles.js configurations in assets/js/particles.json. The library homepage features an interactive tool from which you can export a new configuration.