# Elemen.ts
## What is this about ?

Elemen.ts is a library in and for Typescript, which provides a set of tools to easily build Single Page Applications.
"Why that ?", would you ask. It's not like we already have bunches :-P
Well, I like designing systems and I needed to practice Typescript... So there you are Elemen.ts ! I also wanted to have my own lightweight solution to build simple apps, when I don't need a monster like React.
And surprisingly it's not working so bad !

Everything is object oriented, so... let's get back to class :-)

## Functionnalities and workflow

- An Application class will be the starting point of every application. It's basically some kind or router on which you will plug the different pages, as well a user template if you need authentication.
- A Page class will be used to define every page of the app (path, title, css/scripts for dynamic imports, access restrictions). Above all, it's on this API that you will feed the page with content.
- A User class, optional, will let you define the profile of your visitors, and by the way store the informations you need. It also comes with wrapper functions to get access to custom authentication methods (login, authenticate, logout).
- A DataManager class to centralize everything that has to do with data: API request methods, data containers... This class has been designed to be extended in order to fit your needs.
- Eventually, we are getting to the Elements classes. The most common HTML Elements each have a dedicated class you can use to construct every little piece of your interface. The names of the classes might be different from the HTML tags, but you'll get used to it : there we find Container, Link, Text, Table, Ordered_List, Dropdown, Input, Section and so on...

More details will come along !
With a Getting started of course.
