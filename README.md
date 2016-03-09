# ghost-tagcloud
Generate tagcloud for [ghost](https://ghost.org/) blog. 

Ghost don't support tagcloud in its template engine yet. Thus the html of generated tagcloud can be written in a static page or themes.

## Install
```
$ npm -g install ghost-tagcloud
```

## Usage

At first a json file which contains the all content in blog should be expored from Ghost. In the example below, the file is named `ghost-demo.json`.

| options | Description | Default|
|---------|-------------|--------|
|   -f     | Json file path | |
| --orderby| The filed to sort. Support `name` and `count` | name|
| --order | How to sort. Support `asc`, `desc` and `random`| asc|
| --minFont| Minimal font size| 10|
| --maxFont|Maximum font size|  20|
| --fontUnit| Unit of font size | px |
| --startColor | Hex color (#111, #b700ff)| #fff |
| --endColor |Hex color (#111, #b700ff)| #222 |
| --list | generate taglist, not tagcloud. ||


#### Base
```
$ ghost-tagcloud -f ghost-demo.json

<a href="/tags/mybatis/" style="font-size: 13.61px; color: #afafaf">MyBatis</a>
<a href="/tags/apache/" style="font-size: 10.00px; color: #fff">apache</a>
<a href="/tags/c/" style="font-size: 10.56px; color: #f3f3f3">c++</a>
<a href="/tags/css/" style="font-size: 10.28px; color: #f9f9f9">css</a>
...
```

#### Order by the count of tag as ascending
```
$ ghost-tagcloud --orderby=count --order=asc -f ghost-demo.json

<a href="/tags/docker/" style="font-size: 10.00px; color: #fff">docker</a>
<a href="/tags/apache/" style="font-size: 10.00px; color: #fff">apache</a>
...
<a href="/tags/css/" style="font-size: 10.28px; color: #f9f9f9">css</a>
...
```

#### Order by the name of tag as ascending
```
$ ghost-tagcloud --orderby=name --order=asc -f ghost-demo.json

<a href="/tags/mybatis/" style="font-size: 13.61px; color: #afafaf">MyBatis</a>
<a href="/tags/apache/" style="font-size: 10.00px; color: #fff">apache</a>
<a href="/tags/c/" style="font-size: 10.56px; color: #f3f3f3">c++</a>
<a href="/tags/css/" style="font-size: 10.28px; color: #f9f9f9">css</a>
<a href="/tags/docker/" style="font-size: 10.00px; color: #fff">docker</a>
...
```

#### Specify the min/max size of font
```
$ ghost-tagcloud --minFont=20 --maxFont=60 -f ghost-demo.json            

<a href="/tags/mybatis/" style="font-size: 34.44px; color: #afafaf">MyBatis</a>
<a href="/tags/apache/" style="font-size: 20.00px; color: #fff">apache</a>
<a href="/tags/c/" style="font-size: 22.22px; color: #f3f3f3">c++</a>
<a href="/tags/css/" style="font-size: 21.11px; color: #f9f9f9">css</a>
...
```

#### Specify the start/end color of font
```
$ ghost-tagcloud --startColor=#f33 --endColor=#123 -f ghost-demo.json

<a href="/tags/mybatis/" style="font-size: 13.61px; color: #a92d33">MyBatis</a>
<a href="/tags/apache/" style="font-size: 10.00px; color: #f33">apache</a>
<a href="/tags/c/" style="font-size: 10.56px; color: #f23233">c++</a>
<a href="/tags/css/" style="font-size: 10.28px; color: #f83333">css</a>
<a href="/tags/docker/" style="font-size: 10.00px; color: #f33">docker</a>
...
```

#### Generate taglist
```
$ ghost-tagcloud --list -f ghost-demo.json   

<ul class="tag-list">

    <li class="tag-list-item">
        <a class="tag-list-link" href="/tags/mybatis/">MyBatis</a>
        <span class="tag-list-count">14</span>
    </li>

    <li class="tag-list-item">
        <a class="tag-list-link" href="/tags/apache/">apache</a>
        <span class="tag-list-count">1</span>
    </li>

    ...

</ul>
```


## License
MIT