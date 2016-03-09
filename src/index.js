#!/usr/bin/env node

'use strict';

var fs            = require('fs'),
    swig          = require('swig'),
    mixture       = require('color-mixture'),
    objectAssign  = require('object-assign'),
    parseArgv     = require('minimist');


// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function getTagInfo(data) {
    var json = JSON.parse(data).db[0].data;
    var info = {};
    
    for(var i=0; i<json.tags.length; ++i) {
        var t = json.tags[i];
        info[t.id] = {name: t.name, slug: t.slug, count: 0};
    }

    for(var i=0; i<json.posts_tags.length; ++i) {
        var pt = json.posts_tags[i];
        if (info.hasOwnProperty(pt.tag_id)) {
            ++info[pt.tag_id].count;
        }
    }
    
    var infoArray = [];
    for(var tag_id in info) {
        if (info.hasOwnProperty(tag_id)) {
            infoArray.push(info[tag_id]);
        }
    }

    return infoArray;   // [{name, count, slug}, ...]
}

function sortTag(tagArray, field, order) {
    field = field || 'name';
    order = order || 'asc';
    if(order !== 'random') {
        // the compare function should not return boolean value
        tagArray.sort(function(a, b) {
            if(order === 'desc') {
                if (a[field] < b[field]) {
                    return 1;                    
                } else {
                    return -1;
                }
            } else {
                if (a[field] > b[field]) {
                    return 1;                    
                } else {
                    return -1;
                }
            }
        });
    } else {
        shuffle(tagArray);
    }
    return tagArray;
}


function renderTagList(tags) {
    if(tags.length < 1) {
        return '';
    }
    var tpl=`
<ul class="tag-list">
{% for tag in tags %}
    <li class="tag-list-item">
        <a class="tag-list-link" href="/tags/{{ tag.slug }}/">{{ tag.name }}</a>
        <span class="tag-list-count">{{ tag.count }}</span>
    </li>
{% endfor %}
</ul>
`;
    return swig.render(tpl, { locals: { tags: tags }});
}

function renderTagCloud(tags, config) {
    config = config || {};
    if (tags.length < 1) {
        return '';
    }
    var defaultConfig = {
        startColor: '#fff', 
        endColor: '#222', 
        fontUnit: 'px',
        minFont: 10,
        maxFont: 20
    };
    config = objectAssign(defaultConfig, config);
    var minCount, maxCount; 
    minCount = maxCount = tags[0].count;
    for (var idx=1; idx < tags.length; ++idx) {
        if (tags[idx].count < minCount) {
            minCount = tags[idx].count;
        }
        if (tags[idx].count > maxCount) {
            maxCount = tags[idx].count;
        }
    }
    // to expand tags
    var startColor = new mixture.Color(config.startColor);
    var endColor = new mixture.Color(config.endColor);
    for (var idx=0; idx < tags.length; ++idx) {
        var tag = tags[idx];
        var ratio = (tag.count - minCount)/(maxCount - minCount)
        tag.fontSize = config.minFont + ratio*(config.maxFont - config.minFont)
        tag.fontSize = tag.fontSize.toFixed(2);
        tag.fontColor = startColor.mix(endColor, ratio).toString();
        tag.fontUnit = config.fontUnit;
    }
    var tpl = `{% for tag in tags %}
<a href="/tags/{{ tag.slug }}/" style="font-size: {{ tag.fontSize }}{{ tag.fontUnit }}; color: {{ tag.fontColor }}">{{ tag.name }}</a>{% endfor %}`;

    return swig.render(tpl, { locals: { tags: tags }});
}

///
///// main
///

var argv = parseArgv(process.argv.slice(2));

fs.readFile(argv.f, function(err, data) {
    if (err) {
        throw err;
    }
    var tags = getTagInfo(data);
    tags = sortTag(tags, argv.orderby || 'name', argv.order || 'asc');
    
    if (argv.list) {
        console.log(renderTagList(tags));
    } else {
        var config = {
            startColor: argv.startColor || '#fff',
            endColor: argv.endColor || '#222', 
            fontUnit: argv.fontUnit || 'px',
            minFont: argv.minFont || 10,
            maxFont: argv.maxFont || 20
        };
        console.log(renderTagCloud(tags, config));
    }

});