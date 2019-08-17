/*!
// ==UserScript==
// @name           Strategic Alliance Lashing Tool
// @namespace      http://relentless.ws
// @description    Strategic Alliance Lashing Tool
// @version        9.4.7
// @include        https://*.kingsofchaos.com/*
// @include        https://*.kingsofchaos.com/detail.php?attack_id=*&suspense=1
// @include        http://*.relentless.ws/*
// @updateurl      http://www.relentless.ws/salt/script/saltscript.user.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @exclude     https://*.kingsofchaos.com/recruit.php
// @exclude     https://*.kingsofchaos.com/login.php
// @exclude     https://*.kingsofchaos.com/register.php
// @exclude     https://*.kingsofchaos.com/error.php
// @author	Erebus
// @grant    GM_getResourceURL
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant GM_log
// @grant GM_registerMenuCommand
// @grant GM_openInTab
// ==/UserScript==
*/
(function(){
    var cver = ('9.4.7');//PUBLIC VERSION (9.3.7)//Always keep one version ahead of public versions, So original copy doesn't get overwritten.

    var changeLog = [];
    function addChange(date,text) {
        changeLog.push([date,text]);
    }
    addChange("07/10/2019 - Erebus", "Fixed stats page [MAXED] info that was added by the nub coder(bondick).");
    addChange("07/10/2019 - Erebus", "Fixed sab log details, added the extra info for DB logs and now updates weapon count on each sab done by user.");
    addChange("07/11/2019 - Erebus", "Fixed reconning detail logs page table buttons(All4 buttons work). Auto update will install instead of download.");
    addChange("07/21/2019 - Erebus", "Fixed upgrade suggestion and calculator. Left `Great Horn` in the last siege upgrade just in case bondick ever decides to add it back.");
    addChange("08/12/2019 - Erebus", "Redone the newsboard and user|chain stats section, and top 10 stats. Added some CSS to the mix.");
    //var W :-->Blackpowder Missile,0,1000,70,1000000,31
    var weapon_inv = new Array();
    weapon_inv[0] = new Array('Blackpowder Missile',0,1000000,31,0);
    weapon_inv[1] = new Array('Chariot',0,450000,31,1);
    weapon_inv[2] = new Array('Excalibur',0,200000,1,2);
    weapon_inv[3] = new Array('Heavy Steed',0,50000,1,3);
    weapon_inv[4] = new Array('Broadsword',0,25000,1,4);
    weapon_inv[5] = new Array('Lance',0,10000,1,5);
    weapon_inv[6] = new Array('Long Sword',0,5000,1,6);
    weapon_inv[7] = new Array('Staff',0,2000,1,7);
    weapon_inv[8] = new Array('Knife',0,1000,31,8);
    weapon_inv[9] = new Array('Broken Stick',0,100,31,9);
    weapon_inv[10] = new Array('Invisibility Shield',1,1000000,31,10);
    weapon_inv[11] = new Array('Dragonskin',1,200000,31,11);
    weapon_inv[12] = new Array('Mithril',1,50000,1,12);
    weapon_inv[13] = new Array('Plate Armor',1,25000,31,13);
    weapon_inv[14] = new Array('Chainmail',1,10000,31,14);
    weapon_inv[15] = new Array('Shield',1,5000,31,15);
    weapon_inv[16] = new Array('Helmet',1,2000,31,16);

    weapon_inv[17] = new Array('Rope',2,40000,31,17);
    weapon_inv[18] = new Array('Dirk',2,75000,31,18);
    weapon_inv[19] = new Array('Cloak',2,140000,31,19);
    weapon_inv[20] = new Array('Grappling Hook',2,250000,31,20);
    weapon_inv[21] = new Array('Skeleton Key',2,600000,31,21);
    weapon_inv[22] = new Array('Nunchaku',2,1000000,31,22);
    weapon_inv[23] = new Array('Big Candle',3,40000,31,23);
    weapon_inv[24] = new Array('Horn',3,75000,31,24);
    weapon_inv[25] = new Array('Tripwire',3,140000,31,25);
    weapon_inv[26] = new Array('Guard Dog',3,250000,31,26);
    weapon_inv[27] = new Array('Lookout Tower',3,1000000,31,27);

    weapon_inv[28] = new Array('Sling',0,2000,31,28);
    weapon_inv[29] = new Array('Club',0,5000,31,29);
    weapon_inv[30] = new Array('Spear',0,10000,31,30);
    weapon_inv[31] = new Array('Warblade',0,25000,31,31);
    weapon_inv[32] = new Array('Warg',0,50000,31,32);
    weapon_inv[33] = new Array('Dragon',0,200000,31,33);
    weapon_inv[34] = new Array('Heavy Shield',1,50000,31,34);
    weapon_inv[35] = new Array('Short Bow',0,2000,31,35);
    weapon_inv[36] = new Array('Crossbow',0,5000,31,36);
    weapon_inv[37] = new Array('Longbow',0,10000,31,37);
    weapon_inv[38] = new Array('Steel Bow',0,25000,31,38);
    weapon_inv[39] = new Array('Steed',0,50000,31,39);
    weapon_inv[40] = new Array('Flaming Arrow',0,200000,31,40);
    weapon_inv[41] = new Array('Elven Cloak',1,50000,31,41);
    weapon_inv[42] = new Array('Hatchet',0,2000,31,42);
    weapon_inv[43] = new Array('Pike',0,5000,31,43);
    weapon_inv[44] = new Array('Mace',0,10000,31,44);
    weapon_inv[45] = new Array('Warhammer',0,25000,31,45);
    weapon_inv[46] = new Array('Hammer Of Thor',0,50000,31,46);
    weapon_inv[47] = new Array('Battle Axe',0,200000,31,47);
    weapon_inv[48] = new Array('Gauntlets',1,50000,31,48);
    weapon_inv[49] = new Array('Scimitar',0,10000,31,49);
    weapon_inv[50] = new Array('Dragon Claw',0,200000,31,50);
    weapon_inv[51] = new Array('Mist Veil',1,50000,31,51);
    weapon_inv[52] = new Array('Flail',0,2000,31,52);
    weapon_inv[53] = new Array('Baton',0,5000,31,53);
    weapon_inv[54] = new Array('Crossbow',0,10000,31,54);
    weapon_inv[55] = new Array('Caltrops',0,25000,31,55);
    weapon_inv[56] = new Array('Hairy Feet',0,50000,31,56);
    weapon_inv[57] = new Array('Smoking Pipe',0,200000,31,57);

    //Error
    //An unknown error has occurred. Please check to make sure cookies are enabled.

    //buy value/666.666=value sabbable with 1 sab.
    var dis = 0;
    var c = document.cookie;
    c = c.split("koc_session=");
    var cookie = c[1];
    //console.log("C0: "+c);
    var placed = false;
    var str = "error";
    var params = '';
    var turing = '';
    var defenderId = '';
    var tmp;
    var firstuser;
    var h4xed;
    var TheChain = "NULL";
    var sTBG = '???';
    var sTBG30 = '???';
    //var UsersGold = '';
    var avghit = '???';
    var lastHit = '???';
    var TheSA = '???';
    var TheDA = '???';
    var TheSpy = '???';
    var TheSentry = '???';
    var TheSATime = '???';
    var TheDATime = '???';
    var TheSpyTime = '???';
    var TheSentryTime = '???';
    var TheAge = '???';
    var LSO = "???";
    var uTag = '?';
    var sSA = "Strike: ???";
    var sDA = "Defence: ???";
    var sSpy = "Spy: ???";
    var sSentry = "Sentry: ???";
    var sGold = "Gold: ???";
    var sBPM = "BPM: ???";
    var sIS = "IS: ???";
    var sNUN = "NUN: ???";
    var sLT = "LT: ???";
    var sCH = "Chariots: ???";
    var sDS = "Skins: ???";
    var sCoverts = "Coverts: ???";
    var gUser;
    var totalAttacks = 0;
    var strengthBPM = '';
    var strengthIS = '';
    var strengthNUN = '';
    var strengthLT = '';
    var fields = new Array();
    var buttons = new Array();
    var pgload = new Array();
    var list;
    var gold;
    var num_untrained;
    var num_sa = 0;
    var num_da = 0;
    var iNunLost = 0;
    var iFailedSab = 0;
    var BASE = "GM_Farm.php?gold=GOLD&da=DA&minute=MIN&tff=TFF";
    var gold = FindText(document.body.innerHTML, 'Gold:<font color="#250202">', '<').replace(/,/g,'');
    GM_setValue("BasePageEdits",'0');


    var tool_inv = new Array('Nunchaku','Skeleton Key','Grappling Hook','Rope','Dirk','Cloak','Lookout Tower','Guard Dog','Tripwire','Horn','Big Candle');

    var weaponSellPct = 0.8, toolSellPct = 0.7;
    var Request = {
        Get: function(url, cb) {
            var details = {};
            details.method = 'GET';
            details.url = url;
            details.headers = {};
            details.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            details.onload = function (responseDetails) {
                //cb(responseDetails.responseText);
                if (typeof cb !== 'undefined') {
                    cb(responseDetails.responseText);
                }
            };
            details.onerror = function(responseDetails) {
                alert("Request for contact resulted in error code: " + responseDetails.status);
            };
            GM_xmlhttpRequest(details);
        },
        Post: function(url, data, cb) {
            var details = {};
            details.method = 'POST';
            details.url = url;
            details.headers = {};
            details.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            details.data = data;
            details.onload = function (responseDetails) {
                //cb(responseDetails.responseText);
                if (typeof cb !== 'undefined') {
                    cb(responseDetails.responseText);
                }
                if(data == 1) { DisplayMessage("Data Collected"); }
            };
            details.onerror = function(responseDetails) {
                alert("Request for contact resulted in error code: " + responseDetails.status);
            };
            GM_xmlhttpRequest(details);
        }
    };
    var script = {
        access:	"http://relentless.ws/salt/script/users/access/",
        server:	"http://relentless.ws/salt/script/backend/",
        update:	"http://relentless.ws/salt",
        page: document.location.toString().split(".com/")[1].split("?")[0],
        version: 6.7
    };
    var username = FindText(document.title,"Kings of Chaos :: ","'s ");
    var userid = FindText(document.body.innerHTML, '<td><a href="stats.php?id=' , '">');
    function rmCommas(num) {return num.replace(/,/g,'');}
    function isNumber(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
    var obj = function(elem) {if (document.getElementById(elem)) return document.getElementById(elem);return false;};
    var objName = function(node,elem,num) {if (node.getElementsByTagName(elem).length > 0) {if (isNumber(num)) {var allnodes=node.getElementsByTagName(elem);return allnodes[num];}else {return node.getElementsByTagName(elem);}}return false;};
    var objClass = function(node,searchClass,tag,num) {	var classElements = new Array();var els = node.getElementsByTagName(tag); var elsLen = els.length;var pattern = new RegExp("\\b"+searchClass+"\\b");	for (ii=0, j=0; ii < elsLen; ii++) {if (pattern.test(els[ii].className)) {	classElements[j] = els[ii];	j++;}}if (isNumber(num)) {	return classElements[num];	}	else {	return classElements;	}};
    //(function(){
    GM_setValue("serverURL", "http://relentless.ws/salt");
    var x = '';
    var warsimg =" data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQECAgICAgICAgICAgMDAwMDAwMDAwP/2wBDAQEBAQEBAQEBAQECAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCAAXAIkDAREAAhEBAxEB/8QAHQAAAgICAwEAAAAAAAAAAAAABwgFBgALAwkKBP/EAD8QAAAFAwIDBAQLBwUAAAAAAAECAwQFBgcIERIAEyEUFTFBCRgyURYXIiMnVliXmNbXKDM0QkeBsjY3OHJ1/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAA6EQACAAQDBQQIBAYDAAAAAAABAgADBBESITETIkFRkQVhktEUMlJxgaGx0gYzU3IVJDRCVPAjYrL/2gAMAwEAAhEDEQA/APUvl1XzW3locpJ53EPZJBrRV31TnbKN2jJNVyqMC2RfSTpTktFlXM+RUA2mMds3XEhTHIUh65r7NGe1xaN1FSmrqaeSswAswGlzxOg106kcIJuK+OmOtZ2gpqVqzGLGws/3ew73JFWRt53MSUdMkZB4EHIGt/T7eaitXhdjtFsQiigKFOBViqEK0AKi6i9h9PcIqmzZgdsNRMZL5EmxtpmLmx7r/K0Mf6o2KP2YsevuWtv+WuHhX2RFe2nfqt1MZ6o2KP2YsevuWtv+WuDCvsiDbTv1W6mM9UbFH7MWPX3LW3/LXBhX2RBtp36rdTAUyCo30emLVsZe8l8rD2Ko+2tPu41pO1Mxxljq2ThzSzojJk6k4ygLb1TNMYoXShSKvVGxWbcTF5qpAMAjCa8qSjTJgsg1yv8AQGNdDT1/aVVKoqNi1S5soLhbnkC7KLngL3OguYFlSVX6MOnbiWPtBI2RtNHXJySpolX2UgHOGNRphWtPFEh37tvLnsoan4d3BtVUnEoyknTN7EsnCLp6kg3VSVPAzpCvKQ+s/q7pz+WXffSNKdmdrTKevqpZBkUptNO1l7p0GWO7AnJSoIY5Ak5RBRdM4b17M3Ip23thrQOJW0NaqW8uB3rivG0uwjKwRYt5ZWIi5etbXQsRVekNIM3vPiF3zYWT5o45nJdtzq2I0qY8xVGa5HIjO1+Iz4aRlqJNbTS6adNmWlzkxJaYrErcrchWJXMEWYA3BHAwLqqstj+xMcxMc8clWrUqyiaYY6WbkgIkmTlADVr8A3SqqotWSSZCpEMcxEiEL0ApeJYVt6o6RR6RUZWnvc/9j5x1z0/W+NNeUmhXcLZnHimKcn64nqGpkK0xvx+pWTkp+FqiWpk8O1ipOiivySbiUg3KKLJUhJA4om3IF0HiiXNkzFD5AYiudhmDa3WOhV0fa1HUmmaY7zRJWacDM4CMocMSMrBSCT6o5xYiUzbkREBsnjr7Jx/432H8QIYQ/p37w4vwL7IjnelVP+Q/iPnEyzpC2J3KRFbIY6CQwiAgbHKxIAI7TbA/29DxPp08/DgKr7IhGqqbf1EzxHzi5kt9aUSEEbD45CIlKI/s42L8RABH+n3EMK+yIYqan/ImeI+cQEzRNrG+0EbGY5JjvAOmOdit23lgI6FG3g7i6j1HXp09/Egq+yIXpVTc/wAxM8R84+COo+2KjjYpY7HI5RTNoB8crEh1ASjqQPi7+UbQPDp01Hy4Cq+yIDVVNv6iZ4j5wQQtvaAaefO/iExx7QmxXVIr6uVjNxVAKcQMH0f6dBTDTpp4+8dVhXLdESFTU2H8xM8R84an0fxynsJRQps49giNR3ROkziI2PhYpoU91K10ZxkNEtGUTEx7UgAVFs1SSboJ7SJpkIUocNPV6wVX5jEm5sO86DWNNNxOM8bmvOqTj0rP3vgpB0/ZpVRI1zBnQYRDKXCdapIz83Iwz3tzyPCMYyEZGrEUdtjKyDYpRVaIqrkITiieRgwnQn/f91jp9mLM9J2qAXRbgk2sdARkb2J0O6dGIBh5sN45xFWEoOPdAzK4ZU9EtFSR7dJuxSM3bCTkME0U0SEjUfZblAgaJgHv4tQWVR3D6RgmuHmTHW+Em+eufPv5w0/EorjOCCM4IIDWRFlqbyNsRd+w1XkKNOXdt1VlASaogcTMiVLDO41CTQFI6SxHcS7XTcomIYpyKolMUQEAHiLosxHlt6rAg/GL6Wom0lTT1Uk2nS3VlPepuPmI8gzqrclZvEPHrNeuImso6ovQ03PojHmdpVFBY69xZSAvK5thkdKJNpEUE5WMb20ZUEyQVKcFE37WWS3kTAd3DO29HSawOKmYD91jZvfu2+N4+or/AA4drVNBJZNj21JZ87f8W0QPJFxmpE7HcaYMBtyYvLXKm5GHkUSkCXOeW8uxU2PtT5tVRRsrF2rhGElci5t+ZZ5PUrVFcXUjqhkbgkpeJkG1JxVG0ZGR86hGxJ3rmVQRI13aJ8+ZTrk5WYUL2sNb5gk65GwAF7DUZRzOy+yqPteoDNSrMo1qEpgwMy4QJYOqIQFuQZjTJjFCzABDvRZ5e+db3Nz2bW0o/KSGpC0khiTavIglPRFNW0rxCoate3JqdnPU/CPZo0VPRNK1HbaJSdunBHzlyxK5SfIpikcSjbtpkyrSWlQBLMsNawN887ccx5xzf4fR0n4dqKuq7IaZWLWvIxFpi4Rs7qWAOG6vpcC+am/DrXpO6EFTlsMVnUTU1ELt6gzvvXTkiwno+29YxYU5LVnkHNKVAwQrGBqBenamiV0YsY6filmEhHJSRuSuUXaZwyo4WXT7wsalr6H+5ud7cLER2qimebX9rgyZmJewpRBUupxCVJGHdIxA7wKNcG2YyiWqO71wp63uXbA9wJhaqaNtjktUVDyloZS3FU0ahGUU6moWlm8o3a0/FXhsTcal5OJCPfx9RkmQqZRyu6h3TBNBBU9pnzmNWm0OSORhsRlpwxKw0IN76giMcvsrs2Sn4fqBSKA1RTrM2uNWOPNjYsZU2WwIZWTAUACzFa5JePGmbpGds5aZ7Q9UOqyiU6EpJi5lF5elJZsjLM6ZjWsvHRSlI0rScfHxcW4IYibFdJ2+aGKZFd0soX5OykKtTSiszEMI5chllbTrzjzP4klzZfbXaSzqTYuZzm29mC5IffLHeGdxukZgWhp0v3af/Qn+IcXRxBoIrE/4lHQNeYHXYIj+6DUAU8CgOnh4m/txJYXExFxf8V4B0TPpqQTaeAagIdEx08x6adPPhnSA6QUw/wBLSP8A5i/+C/C5RIaCD16PofoAocNDdKgucO4fYHW6VadC9faLp16eAh/ZL6vWL6r8xvcPoI01PE4zxu079q8q3mTSioKmSRo29J9E0DqKbCQ9RH0QTRIqs6EVP5ShuERECgIgACjfCTwixPzE53ESmL+S9uWtrYVkpTeQRlmrVsQ52+JuVL1kYDc4Si2kGdm1457oIDuMiobTpr/Lqgwtx6GJGQ41ZPGv3QxnrO23+rWQv4Rsrv0W4MQ7+hhbJua+JfOM9Z22/wBWshfwjZXfotwYh39DBsm5r4l844FspbZoa76YyMNtQXcDycPct3Hzbfl8wociyKm5c3MDYkGqiug7Cm2m0MQ7+hgElzxTxL5xz+s7bf6tZC/hGyu/RbgxDv6GDZNzXxL5xQpLJewClLypE6du4Sm++5Q0uYcTcliQYT5qjcjN95GVssMcMuFWmV7SVYQVCQA2/wCdASiYl+HuMPZTbjMYv3L8OMAqvMgrSOX6PPgLslmSxwgPb8Zchmkj3V2hbf8Ax1qEXBo/n7tfFPfr568SxLfO+nIw9lMzsV4f3L5wsFa5CW4LNz53kDeHvdw4R+EhXuMeQxpkFezrO2gzxHNphlGqwMXBgL2gCGEoLJ+KapSwxJ8fcYsEieV3WXD+9bf+ucKXKXzg1JBM8NC3YKqDN4FOg2x2vSmoamxKcThHkNbApwiwjVA3CQAKCQFAR2gAcRDJy+UHo9Zc7w8a/dFVeXgkDRhiScRfXudN7HAqLuxt+CsBlDxjjuLtR1Lfgiq/CK5nY+YJlAbbuVonu4niXPI9DETTzrLdktw30+W9ErPXjX77YqVxEX1CU7sZizCprE3+F93JyFAjQZpSFvgcBFijr2flhyQDUShprwsQtoehiLU83O7Jf96fdEineqjgTIHc12uhC+Fgr7CHsh5hbjQeI4h39DAKeZYbyeNPuivTd5KRVANsTdYNFSdFLEXvSAfmhDURVt2QdwadA18B8B8mGHI9DC9HmXO9L8afdEdGXhpIjgxhibqaco3Qli72KCPyidDAS3pzAXz16dQDr5Cyw5HoYDTzLetL8afdBHC91G/Bt+j3Ld3eePXIA+r9frlAIkW0Ey/xbcghevtCYCh7+FiGWvQxIU8yw3k8afdDpejxcEd462+dJAsVFzN3LcJEctXLJyUi1zawUKDho8TQdtVgKYAMkqmRRMwCUwAYBAGnq9YKoWmuONh9BGmu4nGeP//Z";
    var targetsimg = "data:image/png;base64,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";
    var linksimg = "data:image/gif;base64,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";
    var farmsimg = "data:image/gif;base64,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";
    var sl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAYADUDASIAAhEBAxEB/8QAGwABAAIDAQEAAAAAAAAAAAAAAAUIAgYHAwT/xAAoEAACAgICAgEEAgMBAAAAAAABAgMEBREAEgYhBxMxQVFhgSIyUnH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAcEQADAAIDAQAAAAAAAAAAAAAAAREhcUHR8LH/2gAMAwEAAhEDEQA/AKtV4ZLE8cFeN5ZpGCIiKWZmPoAAfck8+jKYy/ibRq5SjapWR94rMTRuPev9WAP3B5MfG9i1T88wNmhQORsxXI3SoDozEHfQH8E/j+ed9wiYWvkcrkPH2sXcJb8OyDVamU7Ceiscjd6x6sCU7Mw2SSANBvW+HhXfwLLmirvHLJY7wnB4fE+HZ2HCmpk48zjI3jsyyGWRZYwS0gWUqD3/AM16hCAAGT9xXyHgcFlU+QL8FWlH5DXylyUrZNiJzFHKgaSu/cxSH2e0ZXe3YggBVJ49rsLJxRsFllwqZhsXeGIdui3TXcQM2yNCTXXewRrf45G87PhcPLnvgfC4+H0JPKJTJJsajjWt2dzv1pVBP9c2/J/GfhVPMwST1YatKnevUJEnvNFFYEUCtFJNI8g6kyMqnoVBLqAF/NeHPcdkTsK0645ufy3F47W83uVfDoaqYeuqRo9aZ5VkfqC57u7dtMSoIOiFH/pcymaahqEE0kEgkhkeORfsyEgj+xyXXyzyNcqMoufy4yYi+gLYuSCb6f8Ax33vr/G9ccc0Q9JfMvJ5qcdOXyPNSVI+nSBr0pRehBTS9tDqQCP0QNcxyPl/kuSp2KuS8hzFurYYPNDPdkkSVhrRZSxBI6r7P6H6445AYVfKvIKmHbE1c9lYMW6sjUo7kiwsrb7AoD10dnfr3vk/4b8lZzAeTVcxdv5LIyVqz1YS9vckKMNajaVZEXXr0UYa36B0Q45byIR/yP5ha838lfL3VcSfSSEGVkaQhR93ZERSfZ9hF9aGvW+OOOZhaf/Z";
    var hittargets = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAAAsCAMAAACaGxdFAAABgFBMVEX9/f3T09Osr65cKSm1tbV6eXlySkq7qajCwsKFZ2eVhYb19/RXV1fi4uLGt7e6ureql5jNzc3TxcXu7u2bmppoZ2eafX24uLfq6uq2ubmvtbWxsa7e1NS5tbV1b29XIyPx8fKOdnajioq0tLGwsbG2t7W1r7K4tbjo6OjOxcWympqdj43f39+vtK+vr7XZ2dmFX1+ztLTZ39/u8PC1tbivo6L39/ff2dm+uLjk5OT6+vqxtLH18fG1srTu6urZ2dbW2dno4uK7sLCysrLx7Oy9ubzs7Oy+vr4AAADo6+vW2dXr6Ou+vsHZ1ti+wcG4vrjr6+nf4t/Z39nf39nr6+u+wb7o4ujHzMfW1tff2d/f3+K4uL6QkY6PkZHHx8no6OLi6Ojr6Oji39/i4t/Bwb6RjpDZ2d+IcHCRb2/Qzc++vrj39Pb09PXBvr7Nzcd+XFuOjo7x6/FbXFzr6/FgX19ubm+XgYGHbm7Q0NDn5+vf4uLo6+jl3uCvr6+srKz////FcvLoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QgSCjU5Kw95OgAACAVJREFUaN7tms9r20oQx+VIooIiTEBg4mAIjuyooBjSWDmkNj2kj8gkSlNQaJpAodBLaXMo1cEX2//6m++OVlrJdpI+y+7hdVTX+mXj/WS+M7Oz0vQkMU3fdxzbDsN2O0lwzKbrSSKP87PF/VUs/+ZkBZO/8vfu1/Xs3TQjn8y249g0Q+0vkBKQMAjG4zC0LNt2XV0PQ90bjL5/17RZxaZpp6cnJ4PB3t67d3HsebZ9d+f7nz5FUa02JtsW9urVzo5htFqG0WxOyba2pplNJnhtCXPJms2jo05nZ846nSMy3LGV2oTMIOt0Dg4ajXMyi+ycNuvchz8QDs/zfc/zFgCpXfyvgRAC14XTQjJJEob1Wjz68WNdQPbIfv0ajQDkwwcAub0dj3MgHz/e3xtGv89AgKBok9R2yfb3McRGo16wRqPTMYz9fdwxKZhhNISdn9/cAMgNbdYNqTYKAgCxrL9AFgExTcfxfUgGOMLQqF3E6wByeiqB7O1dXwOIbfv+69dv3zKSb98A5PPn9+8hmW632WS5FKHIIwzQdSENIFFNCgZ3qBi7XcM4OAAUCeSSNuuSYnrkOKYZs20cyIIY8ntAFnlIlUAoubquZUUR/mIAYpJkqg+qEMxzgurTkikG1dRDniEZBNV+nyVzeQkgD7RZDyQZy/eDwHHi2HGcTQFZcwxpVAckIgQmMo9tU1lC5tTii5cvNwek6CGLJDN5RlBN9SKSLkTz5o3r7u6qaReSkWmXgXDadURhZtsbAKKXrQTkmZIpAcnASCCFoLo6kFmSWFYYcmnCQXUUVwUkw8I7pSyzDsksD6osmZ2dPKh+pc36KoEMh3E8HA43B+RU00tZpghkWZaB6fqTabcyICFmN6Y5nWJyAyD12nVFaVfXciCIIPqyLHOreEjqIEoMAQ/9ybTLVfs/B8JoYMNul5HwazJpNoGEgyqX7mxOVrrjV3nrBKLNFA8hIrNyTL17SjKZgyz0EAUInAM8qgAiUq3putOp53HpDslUl11SIOVClStVXX9GparrT0rmmXXIwUGrBSAPD4WgKoDYtig9NgxE5hsA4b1P9CIgajICkHSX3YMNfNLdVDHSQ+ifEEwlQIbtNtKt77uu46BhQpK5qLIwk0GVNJOPGTFEy46YB0mM30gy/BFBhL+BjgQO/sbpdNfd3c89JKtDngCCK3naLUomScbjJEk2CiQPKiMoRkuvMBCNBIMTkAwOSTLCRxTJwDfoTdMVxZQmd6sDCbmpNp2ijQj5WLX4usrJnQKEg4iWSsa+E5KJIu0WO4ghKRC8dSUQ1okEomNss2KSeX7a7XRQvEvJXNFmXTEQ30+Sen2jQPKoykGEXAQ7IqhiZzv1EMoyBSBFD0EoKc3tZPCoCAiFUQDRdd9HI4BCGqXdKucyJSCDHIj0kNtbbd5DpM0BYSdZ1CHiuLpMMijdcQ1Arq7yoGqmkomi8Tgid90YEIgmG6amAqG5DLuIuJJ6iPy4KplsdrRkdidcZVUg7eEQpRkWA4IA4TWpXVyfnKwFiJ4lj1+Iqh8EEFGFZEPVPqZAlLlMXofM8my8bHbXQIMaZRlwqJI5PETaVSd3LBlehkDJwUF1g0DEgE+EZBQgPNuVzERhJmPIfGGmzaSLzLfM0ty7KpCQJdNuc3sIyxDxaH1AThjInpjuqkA0pXQXHyEPSUckgYj/GUkJSJ5jHg+qUFUuGW4hysmdYXge3fIHgAxkqcpAhGZQneVA+DNzQDRdOoxGQPJ1mUaedysAogNCu+37hoEFK3IaSrvrKcw0JXmIqQx2eCpTqtyVIxqVrrjIRACZ74ek012r0eiTHR2dnU0mvV65ydxqqUGVW4jtFMhkEsd027qBZAPLS/f0nC2vLACi5Z8iIJqMpNnZJesylQBJ8KOxECHc2KN9IZnKOqnZO5UhfLAn3jQ7vaQhhGgFIv2+vJYml3R/lp8tJ5l61lNdtpTJd6tAipKxrDimk+sGUuwyZx2zcsNMDTP6Ix3EpS3ERmVAwigSQknQIrIsXQ/WtFDFk5m0QxQXm+7p3G57WxB5pOm+GEihIfL4UiYHVW4QcdrFUmYUofkhbNNATmSHSHYQhYekUxlKMkCzrOkOQquu7T4NREcxhurVNBGETBNN5rVIRu2ZkYfkiqnlQF6JoGq0drrdXi9NnIsXdyntHh4i7RYeiHgk7aotRHUZIklL9zAULdTNA0mDSDmEMBHhIIbRb+VA8t479uSRbIioQB5f230ukPTBKZStaJK02+1afLEGIOXF3cIylTbL8yySY7/f6+3vzwdUAPmvklEXu9UWonykKkniGKX7poAwkbzvXlqVkXlW9Nxb+8afAxLiMSrHwQ2GEcdoIY7i9a3tLgNSXITo9ZrNXg+DR9Ishg8enuuenR0dsQTKQBoNw0BpxrJRgQBJDoQXqlgyQYAHDskdNgVEKkbohYBQklnwuIx8wuxPAglQukMu43G9jjbzcW10sY7nQ/Kse3z85YvnPb6y2+0eHnIQLQJRnw/JOoiZ3d/LwqzZLBdmmP4XG0R5YYa0K2fTi4AMKB1r80NaDQfJhSLqYHB8zAuZopHp02+JxplZVr2OvyNqhgVlamGZCqtzuLfoHziDK5NCQYfv6/Xabcfh++EPjjOhjf6VgIigWnh098cpTUQRVqvzEhXIz59PAcFLLkOqqTMH0iN7HAjukJ8MAp78uy7u7naDAI/HvHgxoe2FAIIHykzT86hI+wukBORfWktsUuWDuuQAAAAASUVORK5CYII=";
    //var mywarimg = "data:image/jpeg;base64,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";
    var mywarimg = "data:image/gif;base64,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";
    ReturnRequest('E_WarCheck.php',0,function(responseTextz){
        if (responseTextz.indexOf("1") > -1) {
            GM_setValue('war', true);
        } else {
            GM_setValue('war', false);
        }
    });
    if (GM_getValue('war', false)) {
        x += '<tr><td><a href="https://www.kingsofchaos.com/stats.php?id=wartab"><img alt="War List" border="0" width="100%" src="' + warsimg + '" ></a></td></tr>';
    }
    x += '<tr><td><a href="https://www.kingsofchaos.com/stats.php?id=targetlist"><img alt="Target List" border="0" height="22px" src="' + targetsimg + '" ></a></td></tr><tr><td><a href="https://www.kingsofchaos.com/stats.php?id=farmlist"><img alt="Farm List" border="0" src="' + farmsimg + '" ></a></td></tr><tr><td><a href="https://www.kingsofchaos.com/stats.php?id=targets"><img alt="hit List" border="0" height="22px" src="' + hittargets + '" ></a></td></tr>';
    var y = '<tr><td><a href="https://www.kingsofchaos.com/stats.php?id=links"><img alt="Third Party Links" border="0" src="' + linksimg + '" ></a></td></tr>';
    var q = document.getElementsByClassName('menu_cell')[0].innerHTML.replace('<tr><td><a href="attacklog',x+'<tr><td><a href="attacklog');
    q = q.replace('<tr><td><a href="buddylist',y+'<tr><td><a href="buddylist');
    document.getElementsByClassName('menu_cell')[0].innerHTML=q;

    h4xed = 0;
    var CurrentURL = document.URL;
    TehURL = CurrentURL.split(".com/");
    TehURL = TehURL[1].split(".php");

    if (TehURL[0] == "base") {
        getNextTech();
        checkAuthorization(false);
        base();
        warlistButton();
        //GM_log(checkAuthorization(true));
        //alert(GM_getValue('gr',''));
    }
    else {
        checkAuthorization(true);
    }
    if (GM_getValue('gr','')) {
        if (TehURL[0] == "base") {chatBox();checkUpdate();}
        if (TehURL[0] == "stats") {getNextTech();warlistButton();stats();processraidingID();checkUpdate();}
        if (TehURL[0] == "battlefield") {getNextTech();warlistButton();battlefieldUser();battlefield();checkUpdate();}
        if (TehURL[0] == "attack") {getNextTech();warlistButton();attack();processraidingID();checkUpdate();}
        if (TehURL[0] == "conquest") {getNextTech();chatBox();checkUpdate();}
        if (TehURL[0] == "trade") {getNextTech();warlistButton();chatBox();checkUpdate();}
        if (TehURL[0] == "writemail") {getNextTech();warlistButton();writemail();chatBox();checkUpdate();}
        if (TehURL[0] == "armory") {getNextTech();armory();warlistButton();checkUpdate();}
        if (TehURL[0] == "inteldetail") {getNextTech();warlistButton();CheckIntel();checkUpdate();}//LINE: 2787 sab() 2796 recon() 3596
        if (TehURL[0] == "intel") {getNextTech();warlistButton();chatBox();checkUpdate();}
        if (TehURL[0] == "train") {getNextTech();warlistButton();train();chatBox();checkUpdate();}
        if (TehURL[0] == "recruit") {getNextTech();warlistButton();checkUpdate();}
        if (TehURL[0] == "detail") {getNextTech();warlistButton();attacklog();checkUpdate();}
        if (TehURL[0] == "mercs") {getNextTech();mercs();chatBox();checkUpdate();}
        if (TehURL[0] == "security") {security();}
        if (TehURL[0] == "attacklog") {getNextTech();warlistButton();realattacklog();chatBox();checkUpdate();}
        if (TehURL[0] == "links") {getNextTech();warlistButton();AccessFunction();checkUpdate();}
        if (TehURL[0] == "inbox") {getNextTech();warlistButton();chatBox();checkUpdate();}
        if (TehURL[0] == "buddylist") {getNextTech();warlistButton();chatBox();checkUpdate();}
        if (TehURL[0] == "alliances") {getNextTech();warlistButton();chatBox();checkUpdate();}
    }
    //serverurl
    //checkUpdate();
    /*function checkUpdate(){
        ReturnRequest("E_ver.php",0,function(response){
            //GM_setValue("Koc_LastVerCheck",hour); //reset the last "updated time"
            if(response > cver){
                var updateQ = confirm("You're using an old version. Do you want to update?");
                if (updateQ){
                    GM_openInTab('http://relentless.ws/salt/script/saltscript.user.js');//MAY HAVE TO RE CHECK AFTER FINISHING OTHER SERVER MARKS
                } else {
                    alert("You will be asked again on another page opening of koc!! So might as well click OK dummy!!");
                }
            }
        });*/
    /*var d=new Date();
        var hour = d.getHours();
        //var seconds = d.getSeconds();
        var lastchecked = GM_getValue("Koc_LastVerCheck");
        if(hour == lastchecked) {
            //Do nothing, we've already checked this hour...
        } else {
            //window.location.replace("https://kingsofchaos.com/base.php");
            request.post(script.server+"E_ver.php",0,function(response){
                GM_setValue("Koc_LastVerCheck",hour); //reset the last "updated time"
                if(response > cver){
                    var updateQ = confirm("You're using an old version. Do you want to update?");
                    if (updateQ){
                        //alert("Updating");
                        GM_openInTab(request.post(script.update+'/ac/saltscript.user.js'));//MAY HAVE TO RE CHECK AFTER FINISHING OTHER SERVER MARKS
                        //GM_openInTab(GM_getValue("serverURL") + '/ac/SALT.user.js');
                    } else {
                        alert("Since you cancelled, it may not ask again. so use the direct link on base page if this happens.");
                    }
                }
            });
        }*/
    //}

    function warlistButton(){
        if (GM_getValue("RL_SALThide4",0) == 0) {
            var tables=document.getElementsByTagName("table");
            var menuTable = getMenutable();
            var newRowss =tables[menuTable].insertRow(4);
            var newCell = newRowss.insertCell(0);
            //newRow =tables[menuTable].insertRow(3);
            newCell = newRowss.insertCell(0);
            newCell.innerHTML='<img src="'+mywarimg+'" alt="Your own special warlist" />';
            newCell.style.cursor = "pointer";
            newCell.addEventListener('click',function(e) {myWarList();},true);
        }
    }
    //})();
    function allPagesData() {
        var source = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
        var my_Rank = trim(FindText(FindText(FindText(source,'Rank:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
        var my_Gold = trim(FindText(FindText(FindText(source,'Gold:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
        var my_Safe = trim(FindText(FindText(FindText(source,'Safe:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
        my_Gold=my_Gold.replace("M","000000");
        var my_Gameturns= trim(FindText(FindText(FindText(source,'Turns:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
        var my_Experience= trim(FindText(FindText(FindText(source,'Experience:','</tr>'),'color','</td>'),'>','<')).replace(/,/g,'');
        GM_setValue("SALT_RANK",my_Rank);
        GM_setValue("SALT_GOLD",my_Gold.toString());
        GM_setValue("SALT_SAFE",my_Safe.toString());
        GM_setValue("SALT_GAMETURNS",my_Gameturns);
        GM_setValue("SALT_EXPERIENCE",my_Experience);
    }
    function security() {
        var whoami = GM_getValue("Koc_User");
        MakeRequestNoMsg('E_Security.php?u=' + whoami);
    }
    function msg_showChangeLog() {

        var text = "";
        for (var i = 0; i < changeLog.length ; i++) {
            text += "<tr><td style='color:red;'> "+changeLog[i][0]+"</td><td style='color:green;'> "+changeLog[i][1]+"</td></tr>";
        }
        //showMessage("");
        //alert(GM_getValue("showChangeLogDivX",-1));
        var Xpos = 350;var Ypos = 300;
        if (GM_getValue("showChangeLogDivX",-1) != -1) Xpos = GM_getValue("showChangeLogDivX",300);
        if (GM_getValue("showChangeLogDivY",-1) != -1) Ypos = GM_getValue("showChangeLogDivY",300);
        makediv('showChangeLogDiv',1,0,0,Xpos,Ypos,'#000000','&nbsp;Strategic Alliance Lashing Tool Change Logs&nbsp;');
        var newHTML = '<div style="text-align:center;"><h2>SALT Change Log</h2><p style="text-align:center;">This is relatively new, and does not include all changes done to previous versions.</p>';
        newHTML += '<table cellpadding="2" cellspacing="0">';
        newHTML += '<tr><th>Date</th><th>Info</th></tr>'+text+'</table></div>';
        document.getElementById("content_showChangeLogDiv").innerHTML = newHTML;
    }
    function getNextTech(){
        if (GM_getValue("RL_SALThide3",0) == 0) {
            var Tech_Cost = GM_getValue("techCost");
            var getXPnum = rmCommas(FindText(FindText(document.body.innerHTML,'<td style="font-size: 8pt">',"</td>"),">","<"));
            var techLeft = 0;
            if(Tech_Cost < getXPnum){
                var fontColour = "red";
                techLeft = "Get Tech!";
            } else {
                var fontColour = "green";
                var techLeft = addCommas(parseInt(Tech_Cost) - parseInt(getXPnum));
            }
            var cID = getClassIndex('menu_cell_repeater_vert','');
            if(!String(cID).match('undefined')){
                document.getElementsByClassName('menu_cell_repeater_vert')[cID].innerHTML = document.getElementsByClassName('menu_cell_repeater_vert')[cID].innerHTML.replace('<td style="color: BLACK;font-size: 8pt;" align="right">Turns:',"<tr><td><span style=\"color: BLACK;font-size: 8pt;\" align=\"right\">Next Tech:</span></td><td><font color='"+fontColour+"'>"+techLeft+"</font></td></tr><tr><td style=\"color: BLACK;font-size: 8pt;\" align=\"right\">Turns:");
            }
        }
    }
    function notifyDiv(name,w,h,l,t,fc,bc) {
        if (document.getElementById(name)) return;
        var newdiv = document.createElement('div');
        newdiv.setAttribute('id', name);
        if (w > 0) newdiv.style.width = w;
        if (h > 0) newdiv.style.height = h;
        newdiv.style.overflow = "auto";
        newdiv.style.position = "absolute";
        if (l >-1) newdiv.style.left = l;
        if (t >-1) newdiv.style.top = t;
        newdiv.style.zIndex = 9999;
        newdiv.style.background = fc;
        newdiv.style.background = bc;
        newdiv.style.borderWidth = '0px 2px 2px 1px';
        newdiv.style.borderStyle = 'solid';
        newdiv.style.borderColor = '#cacaca #000000 #000000 #cacaca';
        document.body.appendChild(newdiv);
    }
    function checkUpdate(){
        var d=new Date();
        var hour = d.getHours();
        var lastchecked = GM_getValue("lastVersionCheck",0);
        hour = 1; lastchecked = 2;
        if (hour != lastchecked) {
            //var url = "http://"+ipadres+"/php/Checkversion.php?version="+version;
            ReturnRequest("E_ver.php",0,function(response){
                //getdata(url,function(response) {
                //alert(lastchecked);

                var values = response;
                //alert(parseInt(response));
                if (response > cver) {
                    var Xpos = 300;
                    var Ypos = 225;
                    //GM_setValue("updateDivX",-1)
                    //GM_setValue("updateDivY",-1)
                    if (GM_getValue("updateDivX",-1) != -1) Xpos = GM_getValue("updateDivX",300);
                    if (GM_getValue("updateDivY",-1) != -1) Ypos = GM_getValue("updateDivY",225);
                    makediv('updateDiv',3,0,0,Xpos,Ypos,'#000000','<span style="color:yellow;">Upgrade available</span>');
                    var newHTML = '<table width="550" cellpadding="2" cellspacing="2">';
                    newHTML += '<tr>';
                    newHTML += ' <td colspan="2" width="100%" style="text-align:center;">';
                    newHTML += 'Upgrade available to version '+values;
                    newHTML += '</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr>';
                    newHTML += ' <td style="padding-right:8px;text-align:right;width:50%;">';
                    newHTML += '<input style="width:100px;cursor:pointer;" type="button" id="cu" name="cUpdate_'+hour+'" value="Cancel" />';
                    newHTML += '</td>';
                    newHTML += ' <td style="padding-left:8px;width:50%;">';
                    newHTML += '<input style="width:100px;cursor:pointer;" type="button" id="du" name="dUpdate_'+hour+'" value="Update" />';
                    newHTML += '</td>';
                    newHTML += '</tr>';
                    newHTML += '</table>';
                    newHTML += '<form id="updateform" method="GET" action="http://relentless.ws/salt/script/saltscript.user.js" >';
                    newHTML += ' <input type="hidden" name="id" value="'+GM_getValue("userid",-1)+'">';
                    newHTML += '</form>';
                    document.getElementById("content_updateDiv").innerHTML = newHTML;
                    document.getElementById("cu").addEventListener('click',function(e) {
                        var hour = e.target.name.replace('cUpdate_','');
                        GM_setValue("lastVersionCheck",hour);
                        closediv("updateDiv");
                    },false);
                    document.getElementById("du").addEventListener('click',function(e) {
                        var hour = e.target.name.replace('dUpdate_','');
                        GM_setValue("lastVersionCheck",hour);
                        document.getElementById("updateform").submit();
                        closediv("updateDiv");
                    },false);
                }
            });
        }
    }
    function armory() {
        if (GM_getValue('gr',false)==true) {
            GM_log(">Arguments: "+arguments.length);
            //GM_log(">Body=Null: "+null==document.body);
            //if(null==document.body) {
            //setTimeOut(armory,10);
            //return;
            //}
            var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
            //allPagesInfo(page);
            var logs = document.getElementsByTagName("table");
            //var stuff = document.body.innerHTML;
            var Username=GM_getValue("Koc_User");
            var Strike = FindText(FindText(page,"<b>Strike Action</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</');//<font size="2" color="#FFFF00">49,647,218</font><font size="2" color="#FFFF00"><b>Strike Action</b></font>
            var Defence = FindText(FindText(page,"<b>Defensive Action</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</');
            var TheSpy = FindText(FindText(page,"<b>Spy Rating</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</');
            var TheSentry = FindText(FindText(page,"<b>Sentry Rating</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</');
            var tff = FindText(FindText(page,"<td><b>Total Fighting Force</b></td","/td>"),'<td align="right">','<');
            GM_setValue('userTFF',rmCommas(tff));
            var fuckupscriptupdating = 1;
            ReturnRequest("E_SelfUpdate.php?user=" + Username + "&sa=" + Strike + "&da=" + Defence + "&spy=" + TheSpy + "&sentry=" + TheSentry + "&rid=0&getthis=" + fuckupscriptupdating,0,function(response){
                //alert(cver);
            });
            //alert(response);
            //var stuff = document.body.innerHTML;
            var str = '';
            var unheld = '';
            var armoryBuy =0;//armoryValues ARRAY
            var armorySell=0;//sellValues ARRAY
            var WEAPONPercentSell = 0;
            var WEAPONPercentBuy = 0;
            var htmlHead = document.getElementsByTagName("head")[0].innerHTML;
            var myRace = FindText(FindText(htmlHead,'<link href="/images/css/common.css" rel="','css" r'),'/css/','.');
            var saBonus = 1;
            var daBonus = 1;
            var spyBonus = 1;
            var sentryBonus = 1;
            //var Dirk,Rope,tWire,horn,bCandle,cloak,hShield,eCloak,gauntlets,mVeil,longSword,Lance,bsword,hsteed,excal,staff,gDog,skelKey,stick,kn,grapHook,LT,NUN,BPM,CH,IS,DS,mithril,pArmor,chainmail,Shield,Helmet,Sling,Club,spear,wblade,warg,drag,sBow,Crossbow,Longbow,stbow,Steed,arrow,pike,Hatchet,Mace,whammer,thor,bataxe,Scimitar,dclaw,Flail,Baton,Caltrops,hFeet,sPipe;
            //var weaponValues = new Array(0);

            //Just used this to figure out the math for %'s
            /*var percent = "25%"
    var parsePercent = parseFloat(percent);
    if (parsePercent == null)
        alert("error");
    else {
        var decimal = parsePercent / 100
        alert(decimal);
    }*/
            $('table.inventory th').parents('table:first').find('tr td').toggle();
            if ($(this).parents('table:first').find('tr td:first').is(':hidden')){
                $(this).find('span.expando').html('+');
            } else {
                $(this).find('span.expando').html('-');
            }
            /*$('table.inventory th').click(function(){
            $(this).parents('table:first').find('tr td').toggle()
            if ($(this).parents('table:first').find('tr td:first').is(':hidden'))
                $(this).find('span.expando').html('+')
            else
                $(this).find('span.expando').html('-')
        }).click()*/
            switch(myRace){
                case 'Dwarves': { saBonus = 1; daBonus = 1.4; spyBonus = 1; sentryBonus = 1.25; break }
                case 'Orcs': { saBonus = 1.4; daBonus = 1; spyBonus = 1; sentryBonus = 1; break }
                case 'Elves': { saBonus = 1; daBonus = 1; spyBonus = 1.4; sentryBonus = 1; break }
                case 'Hobbits': { saBonus = 1.15; daBonus = 1; spyBonus = 1; sentryBonus = 1.4; break }
                case 'Undead': { saBonus = 1; daBonus = 1.2; spyBonus = 1; sentryBonus = 1; break }
                default: { daBonus = 1.0; saBonus = 1.0; spyBonus = 1; sentryBonus = 1; break; }
            }
            GM_setValue("SALT_myRace",getRaceNr(myRace));
            //var tab_armory = {"Broken Stick":"60","Knife":"600","Short Bow":"1200","Staff":"1200","Helmet":"1200","Hatchet":"1200","Sling":"1200","Pike":"3000","Club":"3000","Long Sword":"3000","Shield":"3000","Crossbow":"3000","Lance":"6000","Chainmail":"6000","Mace":"6000","Spear":"6000","Scimitar":"6000","Longbow":"6000","Broadsword":"15000","Plate Armor":"15000","Warhammer":"15000","Warblade":"15000","Steel Bow":"15000","Rope":"24000","Big Candle":"24000","Mithril":"50000","Steed":"30000","Elven Cloak":"30000","Hammer Of Thor":"30000","Warg":"30000","Gauntlets":"30000","Mist Veil":"30000","Heavy Shield":"30000","Dirk":"45000","Horn":"45000","Cloak":"84000","Tripwire":"84000","Battle Axe":"120000","Excalibur":"120000","Dragonskin":"120000","Dragon":"120000","Flaming Arrow":"120000","Dragon Claw":"120000","Grappling Hook":"150000","Guard Dog":"150000","Chariot":"270000","Skeleton Key":"360000","Blackpowder Missile":"600000","Invisibility Shield":"600000","Nunchaku":"600000","Lookout Tower":"600000"};
            //var Btab_armory = {"Broken Stick":"100","Knife":"1000","Hatchet":"2000","Short Bow":"2000","Sling":"2000","Staff":"2000","Helmet":"2000","Club":"5000","Crossbow":"5000","Pike":"5000","Long Sword":"5000","Shield":"5000","Longbow":"10000","Spear":"10000","Lance":"10000","Mace":"10000","Scimitar":"10000","Chainmail":"10000","Warblade":"25000","Steel Bow":"25000","Broadsword":"25000","Warhammer":"25000","Plate Armor":"25000","Steed":"50000","Steed":"50000","Warg":"50000","Hammer of thor":"50000","Dragon Claw":"50000","Heavy Shield":"50000","Mithril":"50000","Gauntlets":"50000","Elven Cloak":"50000","Mist Veil":"50000","Dragon":"200000","Flaming Arrow":"200000","Excalibur":"200000","Battle Axe":"200000","Dragonskin":"200000","Chariot":"450000","Invisibility Shield":"1000000","Blackpowder Missile":"1000000","Rope":"40000","Dirk":"75000","Cloak":"140000","Grappling Hook":"250000","Skeleton Key":"600000","Nunchaku":"1000000","Big Candle":"40000","Horn":"75000","Tripwire":"140000","Guard Dog":"250000","Lookout Tower":"1000000"};
            //var myObj = JSON.parse(Btab_armory);
            //var tt = myObj.Knife;
            //alert(tt);

            //try {
            var my_weapons = new Array();
            var weapons = FindText(page,'Current Weapon Inventory','Military Effectiveness');//STOPPED JUST TO GET STRIKE AND DEFENSE WEAPONS ONLY
            //var weapons = FindText(page,'Current Weapon Inventory','Current Tool Inventory');
            var tWeapons = weapons.split('<tr>');
            for (var i=0;i<tWeapons.length;i++) {
                tWeapons[i] = trim(tWeapons[i]);
                if (tWeapons[i].indexOf('<td>') != -1 && tWeapons[i].indexOf('<td style="') >= -1) {
                    /*SA/DA*/
                    var wtype = FindText(tWeapons[i],'<font size="2" color="White">','</font>').replace(/,/g,'');
                    if(wtype == null || wtype == '') {
                        /*SPY/SENTRY*/
                        wtype = FindText(tWeapons[i],'<td>','<br>').replace(/,/g,'');
                    }
                    /*SA/DA*/
                    var weapqu = parseInt(FindText(tWeapons[i],'</font></td>','<td align="left">').replace(/,/g,'').replace('<td align="center">','').replace('</td>','').replace(/,/g,''));
                    if(isNaN(weapqu)) {
                        /*SPY/SENTRY*/
                        weapqu = parseInt(FindText(tWeapons[i],' align="right">','</td>').replace(/,/g,''));
                    }
                    my_weapons[my_weapons.length] = new Array(wtype,weapqu);
                    //console.log("Weapons: "+wtype+"  Qty: "+weapqu+" ->");//
                }
            }
            //GM_deleteValue("USERS_WEAPONS_ARMORY");
            var weaponsTr = '';
            var perWpSov = 0;
            var weaponValues = new Array(0,0,0,0);
            var weapSellValues = new Array(0,0,0,0);
            var myRaceNmbr = GM_getValue("SALT_myRace",-1);
            for (var i=0;i<my_weapons.length;i++) {
                var wtype = getWeaponByName(my_weapons[i][0],myRaceNmbr);
                var wpNmr = getWeaponNr(my_weapons[i][0]);
                weaponValues[wtype[1]] += (my_weapons[i][1] * wtype[2]);
                //alert(my_weapons[i][1]);
                //if(GM_getValue("USERS_WEAPONS_ARMORY")){
                var oAWv = GM_getValue("USERS_WEAPONS_ARMORY","0,0,NONE,0,0,0,0").split("|");
                //alert(oAWv.length);
                for (var j=0;j<oAWv.length;j++){
                    var mweap = oAWv[j].split(",");
                    //alert(mweap);
                    var weap = getWeaponName(mweap[2]);
                    var weap_name  = mweap[2];//wmame
                    var weap_cnt = parseInt(mweap[1]);
                    //if((weap_name == 'Blackpowder Missile') && (weap_cnt > my_weapons[i][1])) {
                    //alert(weap_name+'='+weap_cnt+','+my_weapons[i][1]);
                    //alert(my_weapons[i][1]);
                    //}
                    if((weap_name == my_weapons[i][0]) && (weap_cnt > my_weapons[i][1])) {
                        str = str + "\nYou're missing " + Math.max(weap_cnt - my_weapons[i][1]) +' '+ weap_name;
                        logLostWeapon(Math.max(weap_cnt - my_weapons[i][1]) +' '+ weap_name);
                        GM_setValue("USERS_WEAPONS_ARMORY",weaponsTr);
                    }
                }
                //}
                if(wpNmr >= 17 && wpNmr <= 27) {
                    perWpSov = wtype[2]*0.7;
                    weapSellValues[wtype[1]] += (my_weapons[i][1] * (wtype[2]*0.7));
                } else {
                    perWpSov = wtype[2]*0.8;
                    weapSellValues[wtype[1]] += (my_weapons[i][1] * (wtype[2]*0.8));//wtype[1]
                }
                //wtype[1]=statType, my_weapons[i][1]=weaponCount, wtype[0]=weaponName, wtype[2]=perWeaponBuyValue, wtype[2]*0.8=perWeaponSellValue,
                //weaponValues[wtype[1]]=totalWeaponsBuyValue, weapSellValues[wtype[1]]=totalWeaponsSellValue
                if (weaponsTr.length > 0) weaponsTr +='|';
                weaponsTr += wtype[1]+','+my_weapons[i][1]+','+wtype[0]+','+wtype[2]+','+perWpSov+','+weaponValues[wtype[1]]+','+weapSellValues[wtype[1]];
            }
            //console.log("weaponsTr-->"+weaponsTr);
            GM_setValue("USERS_WEAPONS_ARMORY",weaponsTr);
            //alert(GM_getValue("USERS_WEAPONS_ARMORY",""));
            var armWp = '';
            var selWp = '';
            for (var i=0;i<4;i++) {
                if (armWp.length > 0) {armWp +=',';selWp +=',';}
                armWp += weaponValues[i].toString();
                selWp += weapSellValues[i].toString();
            }
            GM_setValue("SALT_ARMORYVALUES_WEAPONS",armWp);
            GM_setValue("SALT_SELLVALUES_WEAPONS",selWp);
            var weaponValues = GM_getValue("SALT_ARMORYVALUES_WEAPONS","0,0,0,0");
            var weapSellValues = GM_getValue("SALT_SELLVALUES_WEAPONS","0,0,0,0");
            var wv = weaponValues.split(",");
            var wsv = weapSellValues.split(",");
            var weaptotal1=0;
            var weaptotal2=0;
            for (var i=0;i<wv.length;i++) {
                weaptotal1 += parseInt(wv[i]);
                weaptotal2 += parseInt(wsv[i]);
            }
            armoryBuy = weaptotal1;
            armorySell = weaptotal2;
            armoryDisplay("Your invested/buy value: <font color=\"white\"><b>" + addCommas(armoryBuy) + "</b></font><br> Your sell value: <font color=\"white\"><b>" + addCommas(armorySell) + '</b></font><br>(<font color=\"white\"><b>Click for more info</b></font>)');

            var weaponsTr = GM_getValue("USERS_WEAPONS_ARMORY","0,0,NONE,0,0,0,0");
            //alert(weaponsTr);
            var amountArray = new Array(0,0,0,0);
            var namesArray = new Array('Attack','Defense','Spy','Sentry');
            var splitWeapNamesArray = [];
            var WEAPONPercentSell = [];
            var WEAPONPercentBuy = [];
            var aatArray = [];
            if (weaponsTr != '') {
                var w = weaponsTr.split("|");
                for (var i=0;i<w.length;i++) {
                    var w1=w[i].split(",");
                    splitWeapNamesArray[i] = w1[2];
                    amountArray[w1[0]] += parseInt(w1[1]);
                    if(!isNaN(parseInt(w1[1]))) {
                        //BPMPercentSell = Math.floor((BPM*800000)/armorySell*100) + '% (' + addCommas(Math.floor(BPM*800000)) + ')';
                        //''=SAME AS ABOVE JUST USE BUY VALUES INSTEAD
                        // alert(w1[3]);//w1[1]=weap amount, w1[2]=weap name, w1[3]=weap buy value
                        WEAPONPercentSell[i] = Math.floor((parseInt(w1[1])*parseInt(w1[4]))/armorySell*100) + '% (' + addCommas(Math.floor(parseInt(w1[1])*parseInt(w1[4]))) + ')';
                        WEAPONPercentBuy[i] = Math.floor((parseInt(w1[1])*parseInt(w1[3]))/armoryBuy*100) + '% (' + addCommas(Math.floor(parseInt(w1[1])*parseInt(w1[3]))) + ')';
                        aatArray[i] = ' [AAT: '+addCommas(Math.floor(armoryBuy * 0.0015015015 / w1[3]))+']'; if(Math.floor(armoryBuy * 0.0015015015 / w1[3]) > w1[1]){aatArray[i]=' [AAT: '+addCommas(w1[1])+']';} //if(aatArray[i]>w1[1]){aatArray[i]=w1[1];}
                        //GM_setValue('[AAT]',aatArray[i]);
                        //alert(WEAPONPercentSell[i]+" = "+[i]);
                        //console.log("GM:-> ",GM_getValue('[AAT]'));
                        //console.log("AATARRAY: ",aatArray[i]+" w1[3]:-> "+w1[3]+" w1[1]:-> "+w1[1]);
                    }
                    document.addEventListener('click', function(event) {
                        if(event.target.id == 'GM_Message2'){
                            var nMsg = "Your invested/buy value: <font color=\"white\"><b>" + addCommas(armoryBuy) + "</b></font><br> Your sell value: <font color=\"white\"><b>" + addCommas(armorySell) + "</b></font><br>";
                            nMsg += "<br>";
                            nMsg += "Buy Value:<br>";
                            var wbn = '';
                            var wbv = '';
                            for (var j=0;j<splitWeapNamesArray.length;j++) {
                                wbn = splitWeapNamesArray[j];
                                wbv = WEAPONPercentBuy[j];
                                nMsg += wbn+": <font color=\"white\"><b>"+wbv+"</b></font><br>";
                            }
                            nMsg += "<br>Sell Value:<br>";
                            var wsn = '';
                            var wsv = '';
                            for (var k=0;k<splitWeapNamesArray.length;k++) {
                                wsn = splitWeapNamesArray[k];
                                wsv = WEAPONPercentSell[k];
                                nMsg += wsn+": <font color=\"white\"><b>"+wsv+"</b></font><font size=\"2\" color=\"red\"><b>"+aatArray[k]+"</b></font><br>";
                            }
                            nMsg += "<br><font color=\"white\"><b>Press Esc to close</b></font><br>";
                            armoryDisplay(nMsg);
                            document.addEventListener("keyup", function(e){
                                if(e.keyCode == 27) armoryDisplay("Your invested/buy value: " + addCommas(armoryBuy) + "<br> Your sell value: " + addCommas(armorySell) + '<br>(<font color=\"white\"><b>Click for more info</b></font>)');
                            });
                        }
                    }, true);
                }
            }


            //console.log("updating stats");
            //var Username=GM_getValue("Koc_User");
            //setWarlist();
            /*ReturnRequest('DisplayOldStats.php?name=' + Username,0,function(responseText){
                DisplayMessage3(responseText);
                //DisplayMessage3('Close');
            });*/
            //} else if(event.target.id == 'ClearLostLog') {

            //for(var i = 0; i < 10; i++) {
            //GM_setValue("logSab_" + i,"");

            //console.log("clrd");
            //window.location = "armory.php";
            //}
            //}
            //}, true);
            //var totalweap = 0;
            //var totalsol = 0;
            //for (var i=0;i<2;i++) {
            //var sol = parseInt(soldiersArray[i]) - parseInt(amountArray[i]);
            //totalweap += parseInt(amountArray[i]);
            //alert("(LASTALERT) totalweap: "+totalweap);
            //totalsol  += parseInt(soldiersArray[i]);
            //var clr = 'lime';
            //if (sol < 0) clr = 'red';
            //var cl='';
            //if (i==3) cl=' class="underline" ';
            //newHTML += '<tr><td'+cl+'>'+namesArray[i]+'</td><td'+cl+' style="text-align:right;padding-left:16px;">'+addCommas(amountArray[i])+'</td><td'+cl+' style="text-align:right;padding-left:16px;">'+addCommas(soldiersArray[i])+'</td><td'+cl+' style="color:'+clr+';text-align:right;padding-left:16px;">'+addCommas(sol)+'</td></tr>';
            //}
            //if ((totalsol - totalweap) < 0) cl = 'red';
            //+addCommas(totalweap)+''+addCommas(totalsol)+''+cl+''+addCommas(totalsol-totalweap);
            // Strike+addCommas(av[0])++addCommas(sv[0].toString())+
            // Defensive+addCommas(av[1])++addCommas(sv[1].toString())+
            // Spy+addCommas(av[2])++addCommas(sv[2].toString())+
            // Sentry+addCommas(av[3])++addCommas(sv[3].toString())+
            // Total+addCommas(total1.toString())++addCommas(total2.toString())+
            /*} catch (e) {
            GM_log("failed in the try-catch(event)-CERROR:", e);
            custom.log("Error: ", e);
        }*/
            //debugger;


            $('html > body > table > tbody > tr > td > table > tbody > tr > th').remove();

            var thisTorF = false;
            if(thisTorF == true){
                var sellofftot = document.createElement("div");
                //alert(GM_getValue("RL_SALThide2",0));
                if (GM_getValue("RL_SALThide2",0) != 0) {
                    sellofftot.innerHTML = '<div style="position:fixed;top:10px;right:10px;background-color:black;margin:1px;color:red;font-size:1.00em;font-family:sans-serif;">Sell All Weapons Button Is Broke!!! <input type="submit" onClick="return false;" id="SellOffButton" style="color:red;font-size:1.00em;font-family:sans-serif;" value="Sell Off Broke" />'+'</div>';
                }
                else {
                    sellofftot.innerHTML = '<p id="SellOffButton"></p>';
                }
                document.body.appendChild(sellofftot);
                document.getElementById("SellOffButton").addEventListener('click', SellAll, true);
            }

            if (GM_getValue("RL_SALThide1",0) == 0) {
                var ButtonsToAdd='<input type="submit" id="ThaSecBuyBut" title="Need to have `Autofill Preferences` set for this to buy them" value="Buy Weapons" onClick="this.value=\'Buying\';this.disabled=true;return false;" style="text-align:left;"  />';
                ButtonsToAdd+=document.getElementsByClassName('table_lines')[0].innerHTML;//getElementsByTagName
                document.getElementsByClassName('table_lines')[0].innerHTML=ButtonsToAdd;
                document.getElementById("ThaSecBuyBut").addEventListener('click', doBuyBut, true);
                //alert(ButtonsToAdd);
            }//document.getElementsByName("buybut")[0].addEventListener('click', doBuying, true);

            function SellAll() {
                //alert('NOT AVAILABLE YET -> Should Have SOLD OFF');
                //return;

                var alltablesman=document.getElementsByTagName('table');
                var fakepost='';
                for (var i=0; i<=alltablesman.length-1; i++) {
                    if (alltablesman[i].getElementsByTagName('th')[0]) {
                        var thtitle=alltablesman[i].getElementsByTagName('th')[0].innerHTML;
                        console.log(thtitle.match(/Current (Weapon|Tool)+ Inventory/i));
                        if (thtitle.match(/Current (Weapon|Tool)+ Inventory/i)) {
                            var rows=alltablesman[i].rows;
                            console.log(rows);
                            for (var j=0; j<=rows.length-1; j++) {
                                var cells=rows[j].cells;
                                if (!((rows[j].innerHTML.match(/Quantity/i)) || (rows[j].innerHTML.match(/Current (Weapon|Tool)+ Inventory/i)))) {
                                    var typepost=rows[j].innerHTML.replace(/\s/ig,'').replace(/(.*)scrapsell\[([0-9]+)\](.*)/gi,'$2');
                                    fakepost='scrapsell['+typepost+']='+cells[1].innerHTML.replace(/(\s|\,)/ig,'');
                                    alert(typepost);
                                    console.log(typepost);
                                    //post('http://www.kingsofchaos.com/armory.php',fakepost);
                                }
                            }
                        }
                    }
                }

            }
            function doBuyBut(event) {
                var elem = document.getElementsByName("buybut")[0];
                var evt = document.createEvent("MouseEvents");
                if(evt && evt.initMouseEvent) {
                    evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
                    elem.dispatchEvent(evt);
                }
                event.initMouseEvent(type,canBubble,cancelable,view,detail,screenX,screenY,clientX,clientY,ctrlKey,altKey,shiftKey,metaKey,button, relatedTarget);
            }
            function doBuying(event){
                var NewBPM = Number(document.getElementsByName('buy_weapon[70]')[1].value);
                NewBPM = Math.floor(GM_getValue('Blackpowder Missile',0) + NewBPM);
                GM_setValue('Blackpowder Missile', NewBPM);
                var NewIS = Number(document.getElementsByName('buy_weapon[71]')[1].value);
                NewIS = Math.floor(GM_getValue('Invisibility Shield',0) + NewIS);
                GM_setValue('Invisibility Shield', NewIS);
                var NewNUN = Number(document.getElementsByName('buy_weapon[75]')[1].value);
                NewNUN = Math.floor(GM_getValue('Nunchaku',0) + NewNUN);
                GM_setValue('Nunchaku', NewNUN);
                var NewLT = Number(document.getElementsByName('buy_weapon[74]')[1].value);
                NewLT = Math.floor(GM_getValue('Lookout Tower',0) + NewLT);
                GM_setValue('Lookout Tower', NewLT);
                event.preventDefault();
            }

            if(str.length > 2){
                var newlink = document.createElement('div');
                newlink.innerHTML  = '<b>' + str + '<br>';
                document.body.insertBefore(newlink, document.body.firstChild);
            }



            var q = document.getElementsByTagName('table');
            //var tr = q.document.getElementsByTagName('content');
            //var stuff = document.body.innerHTML;
            var totalAttackWeapons = 0;
            var totalDefenseWeapons = 0;
            var totalSpyTools = 0;
            var totalSentryTools = 0;
            var total_attack = 0 ;
            var total_defense = 0 ;
            var total_spy = 0 ;
            var total_sentry = 0 ;

            var attack_soldiers = 0 ;
            var attack_mercs = 0 ;
            var defense_soldiers = 0 ;
            var defense_mercs = 0 ;
            var untrained_soldiers = 0 ;
            var untrained_mercs = 0 ;
            var spies = 0 ;
            var sentrys = 0 ;

            var attack_weapless = 0;
            var attack_unheld = "";
            var defense_weapless = 0;
            var defense_unheld = "";
            var spy_weapless = 0;
            var spy_unheld = "";
            var sentry_weapless = 0;
            var sentry_unheld = "";

            //sa
            var strength_BPM = 1000;
            var strength_CH = 600;
            var strength_FLAMARROW = 256;
            var strength_EXCAL = 256;
            var strength_HSTEED = 64;
            var strength_BSWORD = 30;
            var strength_LANCE = 10;
            var strength_LSWORD = 5;
            var strength_STAFF = 2;
            var strength_KNIFE = 1;
            //da
            var strength_IS = 1000;
            var strength_DS = 256;
            var strength_mithril = 64;
            var strength_ELVCLK = 64;
            var strength_pArmor = 30;
            var strength_chainmail = 10;
            var strength_Shield = 5;
            var strength_Helmet = 2;
            //spy
            var strength_ROPE = 40;
            var strength_DIRK = 75;
            var strength_CLOAK = 140;
            var strength_GHOOKS = 250;
            var strength_KEYS = 600;
            var strength_NUN = 1000;
            //sentry
            var strength_BCANDLES = 40;
            var strength_HORN = 75;
            var strength_TRIPWIRE = 140;
            var strength_GDOG = 250;
            var strength_LT = 1000;

            var Techstr = Number(GM_getValue("set_Tech","0"));//0
            var siegeArry = Number(GM_getValue('siegeArr',"1"));//23.3
            var fortArry = Number(GM_getValue('fortArr',"1"));//3.811
            var offieBonus = parseFloat(0.1);//var offieBonus = Number(GM_getValue("set_offieBonus"));//0.1
            var Covert_lvl = Number(GM_getValue('Covert_lvl',1));//175.9218604441601
            //0, 23.3, 3.811, 0.1, 175.9218604441601
            var percent = "60%";//0.6
            var parsePercent = parseFloat(percent);
            if (parsePercent == null){
                //alert("error");
            } else {
                var decimal = parsePercent / 100;
                //alert(decimal);
            }

            //alert(Techstr+", "+siegeArry+", "+fortArry+", "+offieBonus+", "+Covert_lvl);

            //alert(strength_NUN+"=> "+Techstr+"=> "+Covert_lvl+"=> "+spyBonus+"=> "+offieBonus);
            //1000=> 0=> 175.9218604441601=> 1=> 0.1

            var i, a, t, w;
            var Username = GM_getValue("Koc_User");
            var weaponstable;
            var toolstable;
            for(i = 0; i < q.length; i++) {
                if(q[i].innerHTML.match("Current Weapon Inventory")) {
                    weaponstable = q[i];
                    //var weaponTableInv = weaponstable.rows.length;
                    //alert(weaponTableInv);
                }
                if(q[i].innerHTML.match("Current Tool Inventory")) {
                    toolstable = q[i];
                    //var toolTableInv = toolstable.rows.length;
                    //alert(toolTableInv);
                }
            }

            /*Attack weapons = excal hsteed bsword Lance longSword staff Knife stick BPM CH sBow Crossbow Longbow stbow steed arrow
	Defense Weapons = IS DS mithril pArmor chainmail Shield Helmet eCloak
	Spy tools = NUN skelKey grapHook cloak Dirk Rope
	Sentry Weapons = LT gDog tWire horn bCandle
	*///compliments from Obviously.

            attack_soldiers = parseInt(String(FindText(FindText(page, '<b>Trained Attack Soldiers</b>','</tr>'),'<td align="right">','</td>')).replace(/,/g, ""));
            attack_mercs = parseInt(String(FindText(FindText(page, '<b>Trained Attack Mercenaries</b>','</tr>'),'<td align="right">','</td>')).replace(/,/g, ""));
            defense_soldiers = parseInt(String(FindText(FindText(page, '<b>Trained Defense Soldiers</b>','</tr>'),'<td align="right">','</td>')).replace(/,/g, ""));
            defense_mercs = parseInt(String(FindText(FindText(page, '<b>Trained Defense Mercenaries</b>','</tr>'),'<td align="right">','</td>')).replace(/,/g, ""));
            untrained_soldiers = parseInt(String(FindText(FindText(page, '<b>Untrained Soldiers</b>','</tr>'),'<td align="right">','</td>')).replace(/,/g, ""));
            untrained_mercs = parseInt(String(FindText(FindText(page, '<b>Untrained Mercenaries</b>','</tr>'),'<td align="right">','</td>')).replace(/,/g, ""));
            spies = parseInt(String(FindText(FindText(page, '<b>Spies</b>','</tr>'),'<td class="subh" align="right">','</td>')).replace(/,/g, ""));
            sentrys = parseInt(String(FindText(FindText(page, '<b>Sentries</b>','</tr>'),'<td class="subh" align="right">','</td>')).replace(/,/g, ""));

            var attack_soldiers_INT = parseInt(attack_soldiers);
            var attack_mercs_INT = parseInt(attack_mercs);
            var defense_soldiers_INT = parseInt(defense_soldiers);
            var defense_mercs_INT = parseInt(defense_mercs);
            var untrained_soldiers_INT = parseInt(untrained_soldiers);
            var untrained_mercs_INT = parseInt(untrained_mercs);
            var spies_INT = parseInt(spies);
            var sentrys_INT = parseInt(sentrys);
            //alert(untrained_mercs);

            //SA
            //unheld weapons wont work off initials of weapons/tools anymore
            var getWeaponsCnt = GM_getValue("USERS_WEAPONS_ARMORY","0,0,NONE,0,0,0,0");
            var wpAmountArray = new Array(0,0,0,0);
            var namesArray = new Array('Attack','Defense','Spy','Sentry');
            if (getWeaponsCnt != '') {
                var wc = getWeaponsCnt.split("|");
                for (var u=0;u<wc.length;u++) {
                    var wc1=wc[u].split(",");
                    if(InStr(page,wc1[2]) == true){
                        if(statNr(namesArray[0]) == wc1[0]){
                            wpAmountArray[wc1[0]] += parseInt(wc1[1]);
                            total_attack = parseInt(attack_soldiers+attack_mercs+untrained_soldiers+untrained_mercs);
                            attack_weapless = parseInt(total_attack - wpAmountArray[wc1[0]]);
                            attack_weapless = (attack_weapless < 1) ? "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+attack_weapless+"</span>";
                            attack_unheld = (total_attack < wpAmountArray[wc1[0]]) ? "<span style=\"font-size:10px;color:yellow;\">"+parseInt(wpAmountArray[wc1[0]] - total_attack)+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>";
                        } else if (statNr(namesArray[1]) == wc1[0]){
                            wpAmountArray[wc1[0]] += parseInt(wc1[1]);
                            total_defense = parseInt(defense_soldiers+defense_mercs+untrained_soldiers+untrained_mercs);
                            defense_weapless = parseInt(total_defense - wpAmountArray[wc1[0]]);
                            defense_weapless = (defense_weapless < 1) ? "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+defense_weapless+"</span>";
                            defense_unheld = (total_defense < wpAmountArray[wc1[0]]) ? "<span style=\"font-size:10px;color:yellow;\">"+parseInt(wpAmountArray[wc1[0]] - total_defense)+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>";
                        } else if (statNr(namesArray[2]) == wc1[0]){
                            wpAmountArray[wc1[0]] += parseInt(wc1[1]);
                            total_spy = parseInt(spies);
                            spy_weapless = parseInt(total_spy - wpAmountArray[wc1[0]]);
                            spy_weapless = (spy_weapless < 1) ? "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+spy_weapless+"</span>";
                            spy_unheld = (total_spy < wpAmountArray[wc1[0]]) ? "<span style=\"font-size:10px;color:yellow;\">"+parseInt(wpAmountArray[wc1[0]] - total_spy)+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>";
                        } else if (statNr(namesArray[3]) == wc1[0]){
                            wpAmountArray[wc1[0]] += parseInt(wc1[1]);
                            total_sentry = parseInt(sentrys);
                            sentry_weapless = parseInt(total_sentry - wpAmountArray[wc1[0]]);
                            sentry_weapless = (sentry_weapless < 1) ? "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+sentry_weapless+"</span>";
                            sentry_unheld = (total_sentry < wpAmountArray[wc1[0]]) ? "<span style=\"font-size:10px;color:yellow;\">"+parseInt(wpAmountArray[wc1[0]] - total_sentry)+"</span>" : "<span style=\"font-size:10px;color:yellow;\">"+0+"</span>";
                        }
                    }
                }
            }

            //sa
            var colour = "<span style='font-size:12px;color:brown;' title=\"The estimated value of 1 weapon\">";
            var sumThisBPM = ((((strength_BPM * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisCH = ((((strength_CH * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisEXCAL = ((((strength_EXCAL * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisHSTEED = ((((strength_HSTEED * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisBSWORD = ((((strength_BSWORD * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisLANCE = ((((strength_LANCE * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisLSWORD = ((((strength_LSWORD * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisSTAFF = ((((strength_STAFF * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisKNIFE = ((((strength_KNIFE * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            var sumThisFLAMARROW = ((((strength_FLAMARROW * 5) * Techstr) * siegeArry) * saBonus) * offieBonus;
            //console.log('Str:'+strength_BPM+' Tech:'+Techstr+' Siege:'+siegeArry+' SABonus:'+saBonus+' OffieBonus:'+offieBonus+' = '+sumThisBPM);//toFixed(0)
            //da
            var sumThisIS = ((((strength_IS * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            var sumThisDS = ((((strength_DS * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            var sumThisMITHRIL = ((((strength_mithril * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            var sumThisELVCLK = ((((strength_ELVCLK * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            var sumThisPARMOR = ((((strength_pArmor * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            var sumThisCHAINMAIL = ((((strength_chainmail * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            var sumThisSHIELD = ((((strength_Shield * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            var sumThisHELMET= ((((strength_Helmet * 5) * Techstr) * fortArry) * daBonus) * offieBonus;
            //spy
            var sumThisNUN = (((strength_NUN * Techstr) * Covert_lvl) * spyBonus) * offieBonus;
            var sumThisKEYS = (((strength_KEYS * Techstr) * Covert_lvl) * spyBonus) * offieBonus;
            var sumThisGHOOKS = (((strength_GHOOKS * Techstr) * Covert_lvl) * spyBonus) * offieBonus;
            var sumThisCLOAK = (((strength_CLOAK * Techstr) * Covert_lvl) * spyBonus) * offieBonus;
            var sumThisDIRK = (((strength_DIRK * Techstr) * Covert_lvl) * spyBonus) * offieBonus;
            var sumThisROPE = (((strength_ROPE * Techstr) * Covert_lvl) * spyBonus) * offieBonus;
            //sentry
            var sumThisLT = (((strength_LT * Techstr) * Covert_lvl) * sentryBonus) * offieBonus;
            var sumThisGDOG = (((strength_GDOG * Techstr) * Covert_lvl) * sentryBonus) * offieBonus;
            var sumThisTRIPWIRE = (((strength_TRIPWIRE * Techstr) * Covert_lvl) * sentryBonus) * offieBonus;
            var sumThisHORN = (((strength_HORN * Techstr) * Covert_lvl) * sentryBonus) * offieBonus;
            var sumThisBCANDLES = (((strength_BCANDLES * Techstr) * Covert_lvl) * sentryBonus) * offieBonus;

            //Object.entries(tds).map((object) => { console.log(object) });
            //var tds = document.getElementsByTagName("td");
            //for (var d=0;d<tds.length;d++) {
            //    tds[d].addEventListener("click", function() {
            //        console.log("Event " + this + " (" + this.innerHTML + ") from event listener "+[0]);
            //    });
            //
            /*object.entries(tds).map(( object ) => {
            for (var o=0;o<object.length;o++) {
                object[o].addEventListener("click", function() {
                    console.log("Map " + this + " (" + this.innerHTML + ") from map method...");
                });
            }
        });*/

            //function createClass(name,rules){
            //    var style = document.createElement('style');
            //    style.type = 'text/css';
            //    document.getElementsByTagName('font')[0].appendChild(style);
            //    if(!(style.sheet||{}).insertRule)
            //        (style.styleSheet || style.sheet).addRule(name, rules);
            //    else
            //        style.sheet.insertRule(name+"{"+rules+"}",0);
            //}

            for (i = 0; i < weaponstable.rows.length; i++){
                if(weaponstable.rows[i].cells[1] != null && typeof weaponstable.rows[i].cells[1] !== 'undefined') {
                    if (weaponstable.rows[i].cells[1].innerHTML == 'Attack Weapons') weaponstable.rows[i].cells[1].innerHTML += ' <span style="font-size:10px;color:green;font-style:italic;">[ ' + addCommas(attack_unheld) + ' Unheld Weapons ]</span><span style="font-size:10px;color:#CC3300;font-style:italic;">[ ' + addCommas(attack_weapless) + ' Weaponless Soldiers]</span>';//<span style="font-size:10px;color:#CC3300;font-style:italic;"></span>';
                    if (weaponstable.rows[i].cells[1].innerHTML == 'Defense Weapons') weaponstable.rows[i].cells[1].innerHTML += ' <span style="font-size:10px;color:green;font-style:italic;">[ ' + addCommas(defense_unheld) + ' Unheld Weapons ]</span><span style="font-size:10px;color:#CC3300;font-style:italic;">[ ' + addCommas(defense_weapless) + ' Weaponless Soldiers]</span>';//childNodes[0].nodeValue
                }
            }
            for (i = 0; i < toolstable.rows.length; i++) {
                if(toolstable.rows[i].cells[1] != null && typeof toolstable.rows[i].cells[1] !== 'undefined') {
                    if (toolstable.rows[i].cells[1].innerHTML == "Spy Tools") toolstable.rows[i].cells[1].innerHTML += ' <span style="font-size:10px;color:green;font-style:italic;">[' + addCommas(spy_unheld) + ' Unheld Tools]</span><span style="font-size:10px;color:#CC3300;font-style:italic;">[' + addCommas(spy_weapless) + ' Weaponless Soldiers]</span>';
                    if (toolstable.rows[i].cells[1].innerHTML == "Sentry Tools") toolstable.rows[i].cells[1].innerHTML += ' <span style="font-size:10px;color:darkgreen;font-style:italic;">[' + addCommas(sentry_unheld) + ' Unheld Tools]</span><span style="font-size:10px;color:#CC3300;font-style:italic;">[' + addCommas(sentry_weapless) + ' Weaponless Soldiers]</span>';
                }
            }

            /*} catch (e) {
            GM_log("failed in the try-catch(event)-CERROR:", e);
            custom.log("Error: ", e);
        }*/
            var FortArray;
            var SiegeArray;
            var cID = getClassIndex('table_lines','Armory Autofill Preferences');
            if(!String(cID).match('undefined')){
                var myFort = FindText(FindText(page,'Current Fortification','<td align="center">'),'<td>','</td>').split(" (")[0]
                var mySiege = FindText(FindText(page,'Current Siege Technolog','<td align="center">'),'<td>','</td>').split(" (")[0]
                //alert(mySiege);
                var upgradeMsgDA = '';
                var upgradeMsgSA = '';
                FortArray = FortList(myFort).split('|');
                SiegeArray = SiegeList(mySiege).split('|');

                GM_setValue('siegeArr',SiegeArray[0]);
                GM_setValue('fortArr',FortArray[0]);
                //getWeaponsCnt Great Horn
                var BPM=0, CH=0, IS=0, DS=0;
                BPM = (rmCommas(FindText(FindText(page,'font size="2" color="White">Blackpowder Missile</font>','1,000</td>'),'td align="center">','<')) > 0) ? rmCommas(FindText(FindText(page,'font size="2" color="White">Blackpowder Missile</font>','1,000</td>'),'td align="center">','<')) : 0;
                BPM = parseInt(BPM);
                CH = (rmCommas(FindText(FindText(page,'font size="2" color="White">Chariot</font>','600</td>'),'td align="center">','<')) > 0) ? rmCommas(FindText(FindText(page,'font size="2" color="White">Chariot</font>','600</td>'),'td align="center">','<')) : 0;
                CH = parseInt(CH);
                IS = (rmCommas(FindText(FindText(page,'font size="2" color="White">Invisibility Shield</font>','1,000</td>'),'td align="center">','<')) > 0) ? rmCommas(FindText(FindText(page,'font size="2" color="White">Invisibility Shield</font>','1,000</td>'),'td align="center">','<')) : 0;
                IS = parseInt(IS);
                DS = (rmCommas(FindText(FindText(page,'font size="2" color="White">Dragonskin</font>','256</td>'),'td align="center">','<')) > 0) ? rmCommas(FindText(FindText(page,'font size="2" color="White">Dragonskin</font>','256</td>'),'td align="center">','<')) : 0;
                DS = parseInt(DS);
                //console.log("BPM:"+BPM+" ->IS:"+IS+" ->DS:"+DS+" ->CH:"+CH);

                if((!isNaN(BPM)) && (!isNaN(CH))) {
                    //wpct[1] weaponsCount
                    if(SiegeArray[1] != 'Max'){

                        var currentSA = (((BPM*SiegeArray[0])*1000)*5)*saBonus + (((CH*SiegeArray[0])*600)*5)*saBonus;  // Forumla is correct.
                        var sellBPM = Math.ceil(removeComma(SiegeArray[2]) / 800000);
                        var sellCH = Math.ceil(removeComma(SiegeArray[2]) / 360000);
                        var newBPM = BPM-sellBPM; //New amount of BPM after selling for upgrade.
                        var newCH = CH-sellCH;
                        var newSA = (((newBPM*SiegeArray[3])*1000)*5)*saBonus + (((CH*SiegeArray[3])*600)*5)*saBonus;
                        var newSACH = (((newCH*SiegeArray[3])*600)*5)*saBonus + (((BPM*SiegeArray[3])*1000)*5)*saBonus
                        if(currentSA < newSA){
                            if(sellBPM < BPM) {
                                upgradeMsgSA += "Sell " + sellBPM + " BPMs and buy " + SiegeArray[1];
                                upgradeMsgSA += "\nYou'll gain " + addCommas(Math.round(newSA-currentSA)) + " SA...";
                                //break;
                            } else {
                                upgradeMsgSA += 'Its not profitable to buy ' + SiegeArray[1] + ' yet';
                                //break;
                            }
                            if(currentSA < newSACH){
                                if(sellCH < CH){
                                    upgradeMsgSA += "<br>OR: Sell " + sellCH + " Chariots and buy " + SiegeArray[1];
                                    upgradeMsgSA += "\nYou'll gain " + addCommas(Math.round(newSACH-currentSA)) + " SA...";
                                    //break;
                                } else {
                                    upgradeMsgSA += 'Its not profitable to buy ' + SiegeArray[1] + ' yet';
                                    //break;
                                }
                            }
                        } else {
                            if(currentSA < newSACH) {
                                if(sellCH < CH){
                                    upgradeMsgSA += "<br>OR: Sell " + sellCH + " Chariots and buy " + SiegeArray[1];
                                    upgradeMsgSA += "\nYou'll gain " + addCommas(Math.round(newSACH-currentSA)) + " SA...";
                                    //break;
                                }
                            } else {
                                upgradeMsgSA = 'Its not profitable to buy ' + SiegeArray[1];
                                //break;
                            }
                        }
                    } else {
                        upgradeMsgSA = 'Already got all sa upgrades.';
                        //break;
                    }
                } else {
                    upgradeMsgSA = "Couldn't detect your BPM [or] Chariot count";
                    //break;
                }
                if((!isNaN(IS)) && (!isNaN(DS))) {
                    if(FortArray[1] != 'Max'){
                        var currentDA = ((((IS*FortArray[0])*1000)*5)*daBonus + (((DS*FortArray[0])*256)*5)*daBonus);  // Forumla is correct.
                        var sellIS = Math.ceil(removeComma(FortArray[2]) / 700000);
                        var sellDS = Math.ceil(removeComma(FortArray[2]) / 140000);
                        var newIS = IS-sellIS; //New amount ofIS after selling for upgrade.
                        var newDS = DS-sellDS; //New amount of DS after selling for upgrade.
                        var newDA = ((((newIS*FortArray[3])*1000)*5)*daBonus + (((DS*FortArray[3])*256)*5)*daBonus);  // Forumla is correct.
                        var newDADS = ((((newDS*FortArray[3])*256)*5)*daBonus + (((IS*FortArray[3])*1000)*5)*daBonus);  // Forumla is correct.
                        if(currentDA < newDA){
                            if(sellIS < IS) {
                                upgradeMsgDA += "Sell " + sellIS + " ISs and buy " + FortArray[1];
                                upgradeMsgDA += "\nYou'll gain " + addCommas(Math.round(newDA-currentDA)) + " DA...";
                                //break;
                            } else {
                                upgradeMsgDA += 'Its not profitable to buy ' + FortArray[1] + ' yet';
                                //break;
                            }
                            if(currentDA < newDADS){
                                if(sellDS < DS){
                                    upgradeMsgDA += "<br>OR: Sell " + sellDS + " DSs and buy " + FortArray[1];
                                    upgradeMsgDA += "\nYou'll gain " + addCommas(Math.round(newDADS-currentDA)) + " DA...";
                                    //break;
                                } else {
                                    upgradeMsgDA += 'Its not profitable to buy ' + FortArray[1] + ' yet';
                                    //break;
                                }
                            }
                        } else {
                            if(currentDA < newDADS){
                                if(sellDS < DS){
                                    upgradeMsgDA += "<br>OR: Sell " + sellDS + " DSs and buy " + FortArray[1];
                                    upgradeMsgDA += "\nYou'll gain " + addCommas(Math.round(newDADS-currentDA)) + " DA...";
                                    //break;
                                }
                            } else {
                                upgradeMsgDA = 'Its not profitable to buy ' + FortArray[1];
                            }
                        }
                    } else {
                        upgradeMsgDA = 'Already got all da upgrades.';
                    }
                } else {
                    upgradeMsgDA = "Couldn't detect your IS [or] DS count";
                }



                //getWeaponsCnt (IF)
                var b;
                b = '<tbody>';
                b +=  '    <tr>';
                b +=  '        <th colspan="3" width="100%">Upgrade Suggestions</th>';
                b +=  '    </tr>';
                b +=  '    <tr>';
                b +=  '        <td width="10%"><b>Siege </b></td>';
                b +=  '        <td width="1%">&nbsp;</td>';
                b +=  '        <td width="89%">' + upgradeMsgSA + '</td>';
                b +=  '		</tr>';
                b +=  '    <tr>';
                b +=  '       	<td width="10%"><b>Fortification</b></td>';
                b +=  '       	<td width="1%">&nbsp;</td>';
                b +=  '        <td width="89%">' + upgradeMsgDA + '</td>';
                b +=  '    </tr>';
                b +=  '    <tr>';
                b +=  '       	<td width="10%"&nbsp;</td>';
                b +=  '       	<td width="1%">&nbsp;</td>';
                b +=  '        <td width="89%">&nbsp;</td>';
                b +=  '    </tr>';
                b +=  '</tbody>';
                b += '<tbody>';
                b +=  '    <tr>';
                b +=  '        <th colspan="3" width="100%">Lost weapon log</th>';
                b +=  '    </tr>';
                var i = 1;

                while(GM_getValue("logSab_" + i,"") != "") {
                    b +=  '    <tr>';
                    b +=  '        <td width="10%"><b>' + GM_getValue("logSab_" + i,"").split("|")[0] + ' </b></td>';
                    b +=  '        <td width="1%">&nbsp;</td>';
                    b +=  '        <td width="89%">' + ConvertTime(GM_getValue("logSab_" + i,"").split("|")[1]) + '</td>';
                    b +=  '		</tr>';
                    i++;
                }
                b +=  '</tbody>';

                document.getElementsByClassName('table_lines')[cID].innerHTML = document.getElementsByClassName('table_lines')[cID].innerHTML  + b;
            }
            var cID = getClassIndex('table_lines','Military Effectiveness');
            if(!String(cID).match('undefined')){
                //hackman stats change +/-
                var Strike = rmCommas(FindText(FindText(page,"<b>Strike Action</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));//<font size="2" color="#FFFF00">49,647,218</font><font size="2" color="#FFFF00"><b>Strike Action</b></font>
                var Defence = rmCommas(FindText(FindText(page,"<b>Defensive Action</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));
                var TheSpy = rmCommas(FindText(FindText(page,"<b>Spy Rating</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));
                var TheSentry = rmCommas(FindText(FindText(page,"<b>Sentry Rating</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));
                var TFF = rmCommas(FindText(FindText(page,'<b>Total Fighting Force</b></td>','td>'),'>','<').replace(/,/g,''));
                //alert(TFF);

                var difStrike=0;
                var difDefence=0;
                var difTheSpy=0;
                var difTheSentry=0;
                var difcolor;
                if (GM_getValue('userSA','') != '') {
                    difStrike = Number(Strike) - Number(GM_getValue('userSA'));
                    difDefence = Number(Defence) - Number(GM_getValue('userDA'));
                    difTheSpy = Number(TheSpy) - Number(GM_getValue('userSPY'));
                    difTheSentry = Number(TheSentry) - Number(GM_getValue('userSENTRY'));
                }
                //var oldValues = new Array(parseInt(GM_getValue("salt_SA",0)),parseInt(GM_getValue("salt_DA",0)),parseInt(GM_getValue("salt_SPY",0)),parseInt(GM_getValue("salt_SENTRY",0)));
                GM_setValue('userSA',Strike);
                GM_setValue('userDA',Defence);
                GM_setValue('userSPY',TheSpy);
                GM_setValue('userSENTRY',TheSentry);

                var cidrows = document.getElementsByClassName('table_lines')[cID].getElementsByTagName('tr');
                cidrows[0].cells[0].setAttribute('colspan','4');
                difStrike<0 ? difcolor = 'red">' : difcolor = 'green">+';
                cidrows[1].insertCell(2).innerHTML = '<font color="'+difcolor+addCommas(difStrike)+'</font>';
                difDefence<0 ? difcolor = 'red">' : difcolor = 'green">+';
                cidrows[2].insertCell(2).innerHTML = '<font color="'+difcolor+addCommas(difDefence)+'</font>';
                difTheSpy<0 ? difcolor = 'red">' : difcolor = 'green">+';
                cidrows[3].insertCell(2).innerHTML = '<font color="'+difcolor+addCommas(difTheSpy)+'</font>';
                difTheSentry<0 ? difcolor = 'red">' : difcolor = 'green">+';
                cidrows[4].insertCell(2).innerHTML = '<font color="'+difcolor+addCommas(difTheSentry)+'</font>';

                //was stats history for armory but changing to options
                document.getElementsByClassName('table_lines')[cID].innerHTML = document.getElementsByClassName('table_lines')[cID].innerHTML.replace("Military Effectiveness","Military Effectiveness <div id=showoptions>[Options]</div>");
                //document.addEventListener('click', function(event) {}
            }
            var bwpTBL = getClassIndex('table_lines','<th colspan="5">Buy Weapons</th>');
            if(!String(bwpTBL).match('undefined')){
                var bwprows = document.getElementsByClassName('table_lines')[bwpTBL].getElementsByTagName('tr');
                bwprows[4].insertCell(4).outerHTML = '<th class="subh" align="left">Max</th>';
                bwprows[15].insertCell(4).outerHTML = '<th class="subh" align="left">Max</th>';
                bwprows[24].insertCell(4).outerHTML = '<th class="subh" align="left">Max</th>';
                bwprows[31].insertCell(4).outerHTML = '<th class="subh" align="left">Max</th>';

            }
            //Erebus

            //Used to figure out what each weapon raises on SA/DA

            //Weapon strength x 5 x 1.05^tech level x 1.25^fort level OR 1.3^siege level x race bonus x officer bonus = ANSWER

            //x 1.35 SA orcs, x 1.4 spy elves, x 1.5 dwarves

            //offie bonus 5 = 1.125, 6 = 1.15, 7 = 1.175, 8 = 1.2, 9 = 1.225, 10 = 1.25

            var cID = getClassIndex('table_lines','Lost weapon log');
            if(!String(cID).match('undefined')){
                document.getElementsByClassName('table_lines')[cID].innerHTML = document.getElementsByClassName('table_lines')[cID].innerHTML.replace("Lost weapon log","Lost weapon log <div id=ClearLostLog >[Clear]</div>");
            }
            document.addEventListener('click', function(event) {
                if(event.target.id == 'showoptions') {
                    create_SALTOptionsDiv();
                } else if(event.target.id == 'ClearLostLog') {
                    for(var i = 0; i < 10; i++) {
                        GM_setValue("logSab_" + i,"");
                        console.log("clrd");
                        window.location = "armory.php";
                    }
                }
            }, true);
            //$("table.table_lines:eq(0)>tbody>tr:eq(0)>th").append(" (Sell Off Value: "+ addCommas(armorySell)+" Gold)");
            gold = gold.replace(/\n/g, '');
            gold = gold.replace(/\t/g, '');
            gold = gold.replace(/,/g, '');
            gold = gold.replace('M', '000000');
            gold = parseInt(gold);
            list = document.body.innerHTML.match(/<td align="right">[\d,]+ Gold<\/td>/g);
            for (i = 0; i < list.length; i++){
                list[i] = list[i].replace('<td align="right">', '');
                list[i] = list[i].replace(' Gold</td>', '');
                list[i] = list[i].replace(/,/g, '');
                list[i] = parseInt(list[i]);
            }	var elems = document.getElementsByTagName('input');
            for (i = 0; i < elems.length; i++){
                if (elems[i].name.match(/buy_weapon.*/g)){
                    fields.push(elems[i]);
                    var name = elems[i].name.match(/buy_weapon.*/g)[0];
                    name = name.replace('buy_weapon[', '');
                    name = name.replace(']', '');
                    var input = document.createElement('input');
                    input.id = '_' + name;
                    input.type = 'submit';
                    buttons.push(input);
                    var cell = document.createElement('td');
                    cell.appendChild(input);
                    elems[i].parentNode.parentNode.appendChild(cell);
                }
            }
            updateButtons();

            document.addEventListener('click', function(event){
                if (event.target.name == "buybut") {
                    var Username=GM_getValue("Koc_User");
                    var Strike = rmCommas(FindText(FindText(page,"<b>Strike Action</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));//<font size="2" color="#FFFF00">49,647,218</font><font size="2" color="#FFFF00"><b>Strike Action</b></font>
                    var Defence = rmCommas(FindText(FindText(page,"<b>Defensive Action</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));
                    var TheSpy = rmCommas(FindText(FindText(page,"<b>Spy Rating</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));
                    var TheSentry = rmCommas(FindText(FindText(page,"<b>Sentry Rating</b></font></td","/td>"),'<td align="right"><font size="2" color="#FFFF00">','</'));
                    Request.Post(script.server+"E_SelfUpdate.php?user=" + Username + '&sa=' + Strike + '&da=' + Defence + '&spy=' + TheSpy  + '&sentry=' + TheSentry + '&rid=0&getthis=' + fuckupscriptupdating,function(response){
                    });
                }

                if (event.target.id.match(/_[\d]+/)){
                    event.stopPropagation();
                    event.preventDefault();
                    var name = event.target.id.match(/_[\d]+/)[0];
                    name = name.replace('_', '');
                    var tmp = document.getElementsByName('buy_weapon[' + name + ']')[0];
                    tmp.value = event.target.value;
                    updateButtons();
                }
            }, true);
            document.addEventListener('change', function(event){
                if(event.target.name.match(/buy_weapon\[[\d]+\]/)){
                    event.stopPropagation();
                    event.preventDefault();
                    updateButtons();
                }
            }, true);

            expcolTable('Current Weapon Inventory');
            expcolTable('Current Tool Inventory');
            expcolTable('Personnel');
            expcolTable('Armory Autofill Preferences');
            expcolTable('Fortification');
            expcolTable('Siege Technology');
            Save_Autofill();
        }
    }
    function TextBetween (str,first,second) {
        if (str==null) {
            //alert("Unexpected page formatting, please reload.");
            return "";
        }
        var x = str.indexOf(first) + first.length;
        var z = str.substr(x);
        var y = z.indexOf(second);
        return z.substr(z,y);
    }
    function Save_Autofill() {
        var userprefs=document.getElementsByTagName('input');
        var i = 0;
        while(userprefs[i]) {
            if (userprefs[i].name == 'prefs[attack]') GM_setValue("Auto_SA",userprefs[i].value);
            if (userprefs[i].name == 'prefs[defend]') GM_setValue("Auto_DA",userprefs[i].value);
            if (userprefs[i].name == 'prefs[spy]') GM_setValue("Auto_Spy",userprefs[i].value);
            if (userprefs[i].name == 'prefs[sentry]') GM_setValue("Auto_Sentry",userprefs[i].value);
            i++;
        }
    }

    function arrContain(colName, arrFetch){
        return (arrFetch.indexOf(colName) > -1);
    }
    function sabInfo(){
        //BUTTON CODE FOR THIS AROUND LINES 4K
        try {
            var whoami = GM_getValue("Koc_User");
            var user = GM_getValue('SAB_USER_NAME','NO_USER');
            ReturnRequest('E_AAT.php?user='+user+'&me='+whoami,0,function(response){
                //var getSabPageInfo = GM_getValue('USER_INFO_SAV','');
                /*var lookUrl = window.prompt('Please enter a web site address', 'http://');
                var getHttp =   lookUrl.substring(0, 7);
                var finalUrl = "";
                if ( getHttp == "http://")
                {
                    finalUrl = lookUrl;
                } else {
                    finalUrl = 'http://' + lookUrl;
                }

                window.location = 'view-source:' + finalUrl;*/
                //alert(response);
                if (user != 'NO_USER') {
                    var getSabPageInfo = GM_getValue("USER_INFO_SAV");
                    var s1 = [];
                    var IRace='', ITurns='', ITbg_thirty='';
                    var IRank = new Array(0);
                    var IFort = new Array(0);
                    var IMorale = new Array(0);
                    var ITech = new Array(0);
                    var IEcon = new Array(0);
                    var IUnit = new Array(0);
                    var ISiege = new Array(0);
                    var ITbg = new Array(0);
                    var splitInfo = response.split("<tr>",107);
                    //alert(splitInfo.length);
                    for (var i=0;i<splitInfo.length;i++){

                        s1=splitInfo[i].split("=");
                        //alert(splitInfo.length);
                        //var stripedHtml = $("<td>").html(s1).text();
                        //<table id="sabpage_info" cellpadding="0" cellspacing="0">
                        //if(InStr(s1[0],'race') == true) IRace = s1[1].toString();//.replace(/,/g,'').replace(' | You have my bow!</td></tr>','');//56
                        //var stripedHtml = $("</td></tr>").html(IRace).text();
                        //if(InStr(s1[0],'turns') == true) ITurns = s1[1].toString();//.replace(/,/g,'').replace('</td></tr>','');//79
                        if(InStr(s1[0],'rank') == true) IRank[0] = s1[1].replace(/,/g,'').replace('</tr>','').toString();//.replace(/,/g,'').replace('</td></tr>','');//80
                        if(InStr(s1[0],'fort') == false) IFort[0] = '???';
                        if(InStr(s1[0],'morale') == true) IMorale[0] = s1[1].replace(/,/g,'').replace('</tr>','').toString();//.replace(/,/g,'').replace('</td></tr>','');//81
                        if(InStr(s1[0],'tech') == true) ITech = s1[1].replace(/,/g,'').replace('</tr>','').toString();//.replace(/,/g,'').replace('</td></tr>','');//82
                        if(InStr(s1[0],'econ') == true) IEcon = s1[1].replace(/,/g,'').replace('</tr>','').toString();//.replace(/,/g,'').replace('</td></tr>','');//83
                        if(InStr(s1[0],'unit') == true) IUnit = s1[1].replace(/,/g,'').replace('</tr>','').toString();//.replace(/,/g,'').replace('</td></tr>','');//85
                        if(InStr(s1[0],'siege') == true) ISiege = s1[1].replace(/,/g,'').replace('</tr>','').toString();//.replace(/,/g,'').replace('</td></tr>','');//86
                        /*if(InStr(s1[0],'tbg') == true && InStr(s1[0],'tbg_thirty') != true){
                            alert(s1[0]+'='+s1[1]);
                        }*/
                        if(InStr(s1[0],'tbg') == true && InStr(s1[0],'tbg_thirty') != true) ITbg = s1[1].replace(/,/g,'').replace('</td>','').replace('</tr>','').toString();//BREAKS HERE
                        //var ITbgStr = s1[1].toString();//.replace(/,/g,'').replace('</td></tr>','');//99 //34157561</table>
                        //ITbg = s1[1].toString();//$("</td></tr></table>").html(ITbgStr).text();
                        //}
                        //if(InStr(s1[0],'tbg_thirty') == true) {
                        //var ITbgthirty = s1[1].toString();//.replace('</td></tr></table>','');//100
                        //ITbg_thirty = s1[1].toString();//$("</td></tr></table>").html(ITbgthirty).text();
                        //}
                    }
                    //GM_setValue("STR1",fetchInfoOne[]+",");</td></tr></table>

                    //alert(ITbg_thirty);
                    var Xpos = 300;
                    var Ypos = 225;
                    //GM_setValue("updateDivX",-1)
                    //GM_setValue("updateDivY",-1)
                    if (GM_getValue("informationDivX",-1) != -1) Xpos = GM_getValue("informationDivX",300);
                    if (GM_getValue("informationDivY",-1) != -1) Ypos = GM_getValue("informationDivY",225);
                    makediv('informationDiv',4,0,0,Xpos,Ypos,'#000000','<span style="color:yellow;">Extra Information For '+user+'</span>');//'+GM_getValue("SAB_USER_NAME")+'
                    var newHTML = '<table id="table_line extraInfo" width="800" cellpadding="2" cellspacing="2">';
                    newHTML += '<thead>';
                    newHTML += '<tr>';
                    newHTML += '<th class="subh" align="left">Name</th><th class="subh" align="left">Last</th><th class="subh" align="left">Now</th>';
                    newHTML += '<th class="subh" align="left">Name</th><th class="subh" align="left">Last</th><th class="subh" align="left">Now</th>';
                    newHTML += '</tr>';
                    newHTML += '</thead>';
                    newHTML += '<tbody>';
                    newHTML += '<tr style="text-align:left;">';
                    newHTML += '<td>Rank:</td><td>???</td><td>' + addCommas(IRank[0]) + '</td>';
                    newHTML += '<td>Fortification:</td><td>' + IFort[0] + '</td><td>' + IFort[0] + '</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';
                    newHTML += '<td>Morale:</td><td>???</td><td>' + addCommas(IMorale[0]) + '</td>';
                    newHTML += '<td>Siege Technology:</td><td>???</td><td>' + ISiege + '</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';
                    newHTML += '<td>Economy:</td><td>???</td><td>' + IEcon + '</td>';
                    newHTML += '<td>Technology:</td><td>???</td><td>' + ITech + '</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';
                    newHTML += '<td>Conscription:</td><td>???</td><td>' + addCommas(IUnit) + '</td>';
                    newHTML += '<td>Hourly TBG:</td><td>???</td><td>' + addCommas(ITbg) + '</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';
                    newHTML += '<td>Turns:</td><td>???</td><td>' + addCommas(ITurns) + '</td>';
                    newHTML += '<td>Race:</td><td>???</td><td>' + IRace + '</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';
                    newHTML += '<td>XP:</td><td>???</td><td>???</td>';
                    newHTML += '<td>Total Soldiers:</td><td>???</td><td>???</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';

                    newHTML += '<td>Spy Level:</td><td>???</td><td>???</td>';
                    newHTML += '<td>Covert Level:</td><td>???</td><td>???</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';

                    newHTML += '<td>Spies:</td><td>???</td><td>???</td>';
                    newHTML += '<td>Sentries:</td><td>???</td><td>???</td>';
                    newHTML += '</tr>';
                    newHTML += '<tr style="text-align:left;">';
                    newHTML += '<td>Commander:</td><td>???</td><td>???</td>';
                    newHTML += '<td>:</td><td></td><td></td>';
                    newHTML += '</tr>';
                    newHTML += '</tbody>';
                    newHTML += '</table>';
                    document.getElementById("content_informationDiv").innerHTML = newHTML;

                    var tables = $('#sabpage_info table tbody tr').map(function(idx) {
                        var $table = $(this).closest('table').clone().find('tbody tr:not(:eq(' + idx + '))').remove().end();
                        return $table;
                    }).get();
                    $('#sabpage_info table').remove();
                    $('body').append(tables);

                }
            });
        }
        catch(e) {
            alert(e.name + "<br>" + e.message);
        }
    }
    function statNr(stat) {
        if (stat == 'Attack') return 0;
        if (stat == 'Defense') return 1;
        if (stat == 'Spy') return 2;
        if (stat == 'Sentry') return 3;
        return -1;
    }
    function getWeaponByName(wname) {
        for (var i=0;i<weapon_inv.length;i++) {
            if (weapon_inv[i][0] == wname){
                return weapon_inv[i];
                //alert(weapon_inv[i]);
            }
        }
        return false;
    }
    function getWeaponName(wpname) {
        for (var i=0;i<weapon_inv.length;i++) {
            if (weapon_inv[i][0] == wpname){
                return weapon_inv[i][0];
                //alert(weapon_inv[i][0]);
            }
        }
        return false;
    }
    function getWeaponNr(wname) {
        for (var i=0;i<weapon_inv.length;i++) {
            //if (weapon_inv[i][4] == wname) return i;
            if (weapon_inv[i][0] == wname) return i;
        }
        return -1;
    }
    /*function getWeaponByKocNumber(nr) {
        for (var i=0;i<weapon_inv.length;i++) {
            if (weapon_inv[i][3] == nr) return weapon_inv[i];
        }
    };*/
    function getWeaponByType(type,ws,race) {//type=stat(SA), ws=weapstr, race=numberrace //    weapon_inv[16] = Array('Invisibility Shield',1,1000000,31);

        for (var i=0;i<weapon_inv.length;i++) {
            //if ((weapon_inv[i][1] == type) && (weapon_inv[i][2]==ws) && ((weapon_inv[i][3] == race) || (weapon_inv[i][3] == 31))) return weapon_inv[i];
            if ((weapon_inv[i][1] == type) && ((weapon_inv[i][3] == race) || (weapon_inv[i][3] == 31))) return weapon_inv[i];
        }
        return -1;
    }
    function getToolByName(tname) {
        for (var i=0;i<tool_inv.length;i++) {
            if (tool_inv[i][0] == tname) return tool_inv[i];
        }
        return false;
    }
    //
    /*function showMissingWeapons(reshow,r) {
        if (document.getElementById("missingweapons")) closediv("missingweapons");
        var rsStr='';
        if (!reshow) {
            GM_setValue("rfl_missingweapons",r);
        } else {
            rsStr= " (ReShow)";
            GM_setValue("rfl_missingweapons",-1);
        }
        var wmissing = r.split("|");
        var newHTML = '<table border="0" width="100%" cellpadding="2" cellspacing="0">';
        newHTML += '<tr><th style="width:230px;">Weapon</th><th style="width:50px;">Nr</th><th style="width:170px;">Cost</th></tr>';
        for (var i=0;i<wmissing.length;i++) {
            var mweap = wmissing[i].split(",");
            var weap = getWeaponByKocNumber(mweap[0]);
            var weap_price = weap[4];
            var weap_name  = weap[0];
            var total = parseInt(weap_price) * parseInt(mweap[1]);
            newHTML += '<tr><td style="width:230px;">'+weap_name+'</td><td style="width:50px;text-align:right;">'+addCommas(mweap[1])+'</td><td style="width:170px;text-align:right;">'+addCommas(total.toString())+'</td></tr>';
        }
        newHTML +='</table>';
        var Xpos = screen.width-480;
        var Ypos = 4;
        if (GM_getValue("missingweaponsX",-1) != -1) Xpos = GM_getValue("missingweaponsX",480);
        if (GM_getValue("missingweaponsY",-1) != -1) Ypos = GM_getValue("missingweaponsY",4);
        makediv("missingweapons",999,0,0,Xpos,Ypos,'#272727','<span style="color:yellow;">You are missing weapons!!</span>'+rsStr);
        document.getElementById("content_missingweapons").innerHTML = '<div id="missingWeapons" style="width:460px;">';
        document.getElementById("missingWeapons").innerHTML = newHTML;
    }*/
    function updateButtons(){
        var new_gold = 0;
        for (i = 0; i < fields.length; i++)
        {
            new_gold += parseInt(fields[i].value) * list[i];
        }
        new_gold = gold - new_gold;
        var new_untrained = 0;
        for (i = 0; i < fields.length; i++)
        {
            if((isNaN(fields[i].value)) || (fields[i].value=='')) { fields[i].value = 0; }
            new_untrained += parseInt(fields[i].value);
        }
        new_untrained = num_untrained - new_untrained;
        for (i = 0; i < buttons.length; i++)
        {
            if (document.URL.match('armory.php'))
            {
                buttons[i].value = Math.floor(new_gold / list[i]);
            } else if (document.URL.match('train.php')) {
                if (list[i] > 0)
                {
                    buttons[i].value = new_untrained >= Math.floor(new_gold / list[i]) ? Math.floor(new_gold / list[i]) : new_untrained;
                } else {
                    buttons[i].value = 0;
                }
            }
        }
    }
    function processraidingID() {
        //GM_deleteValue("Attackee");
        //function raidbutton(){//attack/sab page only
        if (document.URL.match('attack.php')){
            document.addEventListener('click', function(event){
                if (event.target.name == "raidbut") {

                    // if raid button is clicked do this
                    parseInt(GM_setValue("raidid", 1));
                    //return;
                }
                if (event.target.name == "attackbut") {
                    // if attack button is clicked do this
                    parseInt(GM_setValue("raidid", 0));

                }
            });
        }
        //var x = event.target.tagName;
        var attack1 = GetElement('input', "Attack Now!");
        var raid2 = GetElement('input', "Raid Now!");
        if (document.URL.match('stats.php')){
            document.addEventListener('click', function(event){
                var raidid = 0;
                parseInt(GM_setValue("raidid", raidid));
                if (event.target.value== "Raid Now!" || event.target.value== "Raid Now! (0)" || event.target.value== "Raid Now! (1)" || event.target.value== "Raid Now! (2)" || event.target.value== "Raid Now! (3)" || event.target.value== "Raid Now! (4)" || event.target.value== "Raid Now! (5)" || event.target.value== "Raid Now! (6)" || event.target.value== "Raid Now! (7)" || event.target.value== "Raid Now! (8)" || event.target.value== "Raid Now! (9)" || event.target.value== "Raid Now! (10)"){

                    var raidid = 1;
                    parseInt(GM_setValue("raidid", raidid));

                    //alert('raid');
                }
                // if attack button is clicked do this
                //document.getElementByName('').onclick =
                if (event.target.value== "Attack Now!"){


                    var raidid = 0;
                    parseInt(GM_setValue("raidid", raidid));
                    //alert('Attack');
                }

                //}
            });
        }
    }
    function attacklog(){
        // Undo the in-line script's hide()
        var scriptable = document.body.appendChild(document.createElement('script'));
        scriptable.type = 'text/javascript';
        scriptable.textContent =
            '$(function () {' +
            '  $("table.battle tr:last td > *").show();' +
            '});';
        var tab = document.getElementsByClassName('battle')[0];
        tab.className = tab.className + '2';
        var dummyTable = document.body.appendChild(document.createElement('table'));
        dummyTable.className = 'battle';
        dummyTable.style.display = 'none';
        dummyTable.style.height = document.body.scrollCenter;
        window.addEventListener(
            'scroll',
            function () {
                dummyTable.style.height = document.body.scrollCenter;
            },
            false);

        var stuff = document.body.innerHTML;
        var ReportID = String(document.URL).substr(String(document.URL).indexOf('=')+1, 8);
        var sGold = 0;
        var result = stuff.indexOf("You <font ") > 0 ? "Successful" : "Defended";
        //alert(result);
        var player_casualties = FindText(FindText(stuff, 'Your army sustains ', 'casualties!'), ">", "<");
        var target_casualties = FindText(FindText(stuff, 'The enemy sustains ', 'casualties!'), ">", "<");

        var tas = FindText(FindText(stuff,'<','of your soldiers are trained attack specialists'),"<b>","</b>").replace(/,/g, "");
        var us = FindText(FindText(stuff,'of your soldiers are trained attack specialists','of your army consists of untrained soldiers'),"<b>","</b>").replace(/,/g, "");
        var tas_INT = parseInt(tas);
        var us_INT = parseInt(us);
        var statsid = GM_getValue("statsid", "");

        //alert('log');

        if(InStr(stuff,'You stole ') == true)
        {
            var whoami = GM_getValue("Koc_User");

            //var Attackee = FindText(FindText(stuff,' gold from <font size="3" color="LIGHTBLUE">','!'),">","<");

            var Attackee = FindText(stuff,'gold from ', '!').trim().replace('<b><font size="3" color="LIGHTBLUE">','').replace('</font></b>','');//<b><font size="3" color="LIGHTBLUE">Seyton</font></b>
            var sa_soldiers = (tas_INT+us_INT);
            //alert(Attackee);

            sGold = rmCommas(FindText(FindText(stuff,'You stole ','gold from'),">","<"));
            //alert(sGold);
            Request.Post(script.server+'E_Log.php?type=attack&raidid='+ GM_getValue("raidid") + '&attacker=' + whoami + '&attackee=' + Attackee + '&gold=' + sGold + '&rid=' + ReportID + '&result=' + result + '&player_casualties=' + player_casualties + '&target_casualties=' + target_casualties + '&sa_soldiers=' + sa_soldiers + '&statsid=' + statsid,0,function(response){
                //GM_deleteValue("Attackee");
            });
        }
        if(InStr(document.URL,'detail.php') == true){
            if(InStr(stuff,'You stole ') == true) {
                var sGold = FindText(FindText(stuff,'You stole ','gold from'),">","<");
                var newx = stuff.replace('Battle Report',sGold + ' Gold stolen...');
                newx = newx.replace('style="display: none">','');

                document.body.innerHTML = newx;
                //GM_setValue("Attackee", '');commented for MAY BE THE CAUSE
            }else{
                //alert("Worked");
                var stuff = document.body.innerHTML;
                var whoami = GM_getValue("Koc_User");
                var result = stuff.indexOf("You <font ") > 0 ? "Successful" : "Defended";
                //alert(result);
                var player_casualties = FindText(FindText(stuff, 'Your army sustains ', 'casualties!'), ">", "<");
                var target_casualties = FindText(FindText(stuff, 'The enemy sustains ', 'casualties!'), ">", "<");
                var defAttackee = FindText(FindText(stuff,'casualties!','<font size="3" color="GREEN">'), '<p>', " forces counter-attack");
                defAttackee = defAttackee.replace("'s</font>","").replace('<font size="3" color="LIGHTBLUE">','');//<font size="3" color="LIGHTBLUE">onlyrightangles</font>
                //alert(defAttackee);
                Request.Post(script.server+'E_Log.php?type=defend&raidid='+ GM_getValue("raidid") +'&attacker='+whoami+'&attackee='+defAttackee+'&rid='+ReportID+'&result='+result+'&player_casualties='+player_casualties+'&target_casualties='+target_casualties,0,function(response){

                });
                /*var newx = stuff.replace('Battle Report','Attack defended');
			newx = newx.replace('style="display: none">','');
            newx.style.height = newx.body.scrollTop;
            window.addEventListener('scroll',function () {
                newx.style.height = document.body.scrollTop;
                },false);
			document.body.innerHTML = newx;*/
            }
        }
    }
    //NEED TYPE ATTACKLOG ADDED TO GM_LOG.PHP
    function realattacklog(){
        //Log hits on you.
        expcolTable('Attacks on You');
        expcolTable('Attacks by You');
        var x = document.getElementsByClassName('table_lines attacklog')[1].innerHTML
        var TBG45Min = Number(GM_getValue('userTbg',0))*30;
        //var postStr='?l=';
        var postStr = '';
        LogTable = x.split('<tr>');
        for(i=3;i<LogTable.length;i++){
            if(String(LogTable[i]).match(" Gold") || String(LogTable[i]).match(" defended")){
                //<a href="detail.php?attack_id=117704">5,189,149 Gold stolen</a>
                //<a href="detail.php?attack_id=117707">Attack defended</a>
                //var AttorDefStr = FindText(LogTable[i],FindText(LogTable[i],"attack_id=",'"') + '">Attack ','</a>')
                //var testStr = rmCommas(FindText(LogTable[i],FindText(LogTable[i],"_id=",'"') + '">',' Gold'))
                var result = rmCommas(FindText(LogTable[i],FindText(LogTable[i],"_id=",'"') + '">',' Gold')) > 0 ? rmCommas(FindText(LogTable[i],FindText(LogTable[i],"_id=",'"') + '">',' Gold')) : FindText(LogTable[i],FindText(LogTable[i],"attack_id=",'"') + '">Attack ','</a>');
                postStr = postStr + '[l]a=' + FindText(FindText(LogTable[i],"stats.php","</td"),">","<") + '-rid=' + FindText(LogTable[i],"_id=",'"') + '-g=' + result + '[/l]';
                //var typeofAttack = FindText(FindText(LogTable[i],'/td>','<td align="right">'),'<td align="left">','<');
                //alert(result);
            }
        }
        //alert(postStr);
        //postStr=postStr + "&type=attacklog&u=" + GM_getValue("Koc_User");
        getlist = "?list="+postStr+"&type=attacklog&u=" + GM_getValue("Koc_User");
        //alert("E_Log.php"+getlist);
        ReturnRequest("E_Log.php"+getlist);
        //alert(postStr);

        var allatttables = document.getElementsByClassName('table_lines');
        for (var i=0; i<allatttables.length; i++) {
            var rows = allatttables[i].rows;
            if (rows.length > 0) {
                var allattth = rows[0].getElementsByTagName('th');
                if ((allattth.length > 0) && (allattth[0].innerHTML == 'Attacks on You')) {
                    for (var j=2; j<rows.length; j++) {
                        var attlinks = rows[j].getElementsByTagName('a');
                        for (var k=0; k<attlinks.length; k++) {
                            var workedonLink = attlinks[k].href.split('.php')[0].split('/');
                            var workedonLink = workedonLink[workedonLink.length-1];
                            if (workedonLink == 'detail') {
                                var resatt = rmCommas(attlinks[k].innerHTML).split(' ');
                                if (resatt[1] == 'defended') {
                                    attlinks[k].setAttribute('style','color:grey;');
                                }
                                else if(Number(resatt[0]) < TBG45Min) {
                                    attlinks[k].setAttribute('style','color:yellow;');
                                    attlinks[k].setAttribute('title',Math.floor(Number(resatt[0])/(TBG45Min/30))+' minutes tbg.');
                                }
                            }
                        }
                    }
                }
            }
        }
        //hackman
    }

    function train(){
        gold = gold.replace(/\n/g, '');
        gold = gold.replace(/\t/g, '');
        gold = gold.replace(/,/g, '');
        gold = gold.replace('M', '000000');
        gold = parseInt(gold);
        num_untrained = FindText(document.body.innerHTML, 'Untrained Soldiers</b></td>\n        <td align="right">', '<');
        num_untrained = num_untrained.replace(/,/g, '');
        num_untrained = parseInt(num_untrained);
        var tff = FindText(FindText(document.body.innerHTML,"<td><b>Total Fighting Force</b></td","/td>"),'<td align="right">','<');
        GM_setValue('userTFF',rmCommas(tff));
        list = document.body.innerHTML.match(/<td align="right">[\d,]+ Gold<\/td>/g);
        for (i = 0; i < list.length; i++){
            list[i] = list[i].replace('<td align="right">', '');
            list[i] = list[i].replace(' Gold</td>', '');
            list[i] = list[i].replace(/,/g, '');
            list[i] = parseInt(list[i]);
        }
        var elems = document.getElementsByTagName('input');
        for (i = 0; i < elems.length; i++){
            //if (elems[i].name.match(/train.*/g))
            //{
            //fields.push(elems[i]);
            //var name = elems[i].name.match(/train.*/g)[0];
            //name = name.replace('train[', '');
            //name = name.replace(']', '');
            //var input = document.createElement('input');
            //input.id = '_' + name;
            //input.type = 'submit';
            //buttons.push(input);
            //var cell = document.createElement('td');
            //cell.appendChild(input);
            //elems[i].parentNode.parentNode.appendChild(cell);
            //}
        }
        //alert(name);
        updateButtons();
        document.addEventListener('click', function(event)
                                  {
            if (event.target.id.match(/_[\w]+/)){
                event.stopPropagation();
                event.preventDefault();
                var name = event.target.id.match(/_[\w]+/)[0];
                name = name.replace('_', '');
                var tmp = document.getElementsByName('train[' + name + ']')[0];
                tmp.value = event.target.value;
                updateButtons();
            }
        }, true);
        document.addEventListener('change', function(event)
                                  {
            if(event.target.name.match(/train\[[\w]+\]/)){
                event.stopPropagation();
                event.preventDefault();
                updateButtons();
            }
        }, true);
        //sets here to be gotten on armory page.
        var covertlVl = FindText(FindText(document.body.innerHTML,'Level ','| '),""," ");
        switch(covertlVl){
            case '16': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '15': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '14': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '13': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '12': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '11': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '10': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '9': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '8': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '7': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '6': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '5': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '4': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '3': { var covertMath = parseFloat(1.6) * parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '2': { var covertMath = parseFloat(1.6) * parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            case '1': { var covertMath = parseFloat(1.6); parseFloat(GM_setValue('Covert_lvl',covertMath)); break }
            default: { var covertMath = 1; GM_setValue('Covert_lvl',covertMath); break }
        }


        //alert(GM_getValue('Covert_lvl'));
        var findTech = FindText(FindText(document.body.innerHTML,"<td colspan=\"2\">","</td"),"(x "," strength)");
        //alert(GM_getValue('Covert_lvl'));
        var input = document.querySelectorAll('input')[26].value;
        input = input.replace('Research! (', '');//15,020 Experience)
        input = input.replace(' Experience)', '');
        input = rmCommas(input);
        //alert(input);
        if(isNaN(input) != false){
            GM_setValue("techCost",1);
        }
        else{
            GM_setValue("techCost",input);
        }

        //alert(parseInt(GM_getValue("techCost")));
        if(isNaN(findTech) != false){
            GM_setValue("set_Tech",1);
        }
        else{
            GM_setValue("set_Tech",findTech);
        }
        expcolTable('Personnel');
        expcolTable('Technological Development');
        var buyyBut = GetElement('input', "Train!");
    }

    function mercs(){//hackman [ not for credits, its just easier to ask the original coder if any trouble appears :D ]
        function getTotalMercs() {
            return Number(rmCommas(obj('trainedSaMercs').innerHTML))+Number(rmCommas(obj('trainedDaMercs').innerHTML))+Number(rmCommas(obj('trainedUntMercs').innerHTML));
        }
        function getInputedMercs(what) {
            if (typeof what == 'undefined') {
                return Number(rmCommas(obj('inpAtt').value))+Number(rmCommas(obj('inpDef').value))+Number(rmCommas(obj('inpUnt').value));
            }
            else if (what == 'SA') {
                return Number(rmCommas(obj('inpAtt').value));
            }
            else if (what == 'DA') {
                return Number(rmCommas(obj('inpDef').value));
            }
            else if (what == 'UNT') {
                return Number(rmCommas(obj('inpUnt').value));
            }
            else {
                return Number(rmCommas(obj('inpAtt').value))+Number(rmCommas(obj('inpDef').value))+Number(rmCommas(obj('inpUnt').value));
            }
        }
        function fill(num) {
            switch(num) {
                case 1:
                    obj('inpAtt').value = Number(rmCommas(obj('attbut').value));
                    break;
                case 2:
                    obj('inpDef').value = Number(rmCommas(obj('defbut').value));
                    break;
                case 3:
                    obj('inpUnt').value = Number(rmCommas(obj('untbut').value));
                    break;
            }
            updateBut();
        }

        function updateBut() {
            var tehGold=gold.replace(/(\s|\r|\n\t)+/g, '').replace('M', '000000');
            var possMercs = Math.floor(rmCommas(obj('totalTFF').innerHTML)/4);
            var avMercs = Math.floor(possMercs-getTotalMercs()-getInputedMercs());
            var saMercs = 0;
            var daMercs = 0;
            var untMercs = 0;
            var attleft = rmCommas(obj('leftAtt').innerHTML);
            var defleft = rmCommas(obj('leftDef').innerHTML);
            var untleft = rmCommas(obj('leftUnt').innerHTML);
            var attgold = rmCommas(obj('priceAtt').innerHTML.replace(/\sGold/i,''));
            var defgold = rmCommas(obj('priceDef').innerHTML.replace(/\sGold/i,''));
            var untgold = rmCommas(obj('priceUnt').innerHTML.replace(/\sGold/i,''));
            tehGold -= (getInputedMercs('SA')*attgold)+(getInputedMercs('DA')*defgold)+(getInputedMercs('UNT')*untgold);
            if (avMercs > 0) {
                if (attleft > 0) {
                    if (Math.floor(attleft*attgold) <= tehGold) {
                        if (attleft > avMercs) {
                            saMercs = avMercs;
                        }
                        else {
                            saMercs = attleft;
                        }
                    }
                    else {
                        var maxmercs = Math.floor(tehGold/attgold);
                        if (maxmercs > avMercs) {
                            saMercs = avMercs;
                        }
                        else {
                            saMercs = maxmercs;
                        }
                    }
                }
                if (defleft > 0) {
                    if (Math.floor(defleft*defgold) <= tehGold) {
                        if (defleft > avMercs) {
                            daMercs = avMercs;
                        }
                        else {
                            daMercs = defleft;
                        }
                    }
                    else {
                        var maxmercs = Math.floor(tehGold/defgold);
                        if (maxmercs > avMercs) {
                            daMercs = avMercs;
                        }
                        else {
                            daMercs = maxmercs;
                        }
                    }
                }
                if (untleft > 0) {
                    if (Math.floor(untleft*untgold) <= tehGold) {
                        if (untleft > avMercs) {
                            untMercs = avMercs;
                        }
                        else {
                            untMercs = untleft;
                        }
                    }
                    else {
                        var maxmercs = Math.floor(tehGold/untgold);
                        if (maxmercs > avMercs) {
                            untMercs = avMercs;
                        }
                        else {
                            untMercs = maxmercs;
                        }
                    }
                }
            }
            obj('attbut').value = addCommas(saMercs);
            obj('defbut').value = addCommas(daMercs);
            obj('untbut').value = addCommas(untMercs);
        }

        //Change the HTML and add all the IDs
        //var perTa = objClass(document,'table_lines personnel','table',0);
        //var rows = perTa.rows;
        /*for (var i=0; i<rows.length; i++) {
		var cells=rows[i].cells;
		switch(cells[0].innerHTML) {
			case '<b>Trained Attack Soldiers</b>':
				cells[1].setAttribute('id','trainedSaSold');
			break;
			case '<b>Trained Defense Soldiers</b>':
				cells[1].setAttribute('id','trainedDaSold');
			break;
			case '<b>Untrained Soldiers</b>':
				cells[1].setAttribute('id','trainedUntSold');
			break;
			case '<b>Trained Attack Mercenaries</b>':
				cells[1].setAttribute('id','trainedSaMercs');
			break;
			case '<b>Trained Defense Mercenaries</b>':
				cells[1].setAttribute('id','trainedDaMercs');
			break;
			case '<b>Untrained Mercenaries</b>':
				cells[1].setAttribute('id','trainedUntMercs');
			break;
			case '<b>Total Fighting Force</b>':
				cells[1].setAttribute('id','totalTFF');
			break;
		}
	}*/
        /*var mercstable = objName(objName(document,'form',0),'table',0);
	var rows = mercstable.rows;
	if (/Buy Mercenaries/g.test(rows[0].innerHTML)) {
		for (var i=0; i<rows.length; i++) {
			var cells = rows[i].cells;
			switch(cells[0].innerHTML) {
				case 'Buy Mercenaries':
					cells[cells.length-1].setAttribute('colspan','5');
				break;
				case 'Mercenary Type':
					cells[cells.length-1].setAttribute('colspan','2');
				break;
				case 'Attack Specialist':
					cells[1].setAttribute('id','priceAtt');
					cells[2].setAttribute('id','leftAtt');
					objName(cells[3],'input',0).setAttribute('id','inpAtt');
					var td = document.createElement('td');var inp = document.createElement('input');inp.type='button';inp.id = 'attbut';td.appendChild(inp);rows[i].appendChild(td);
				break;
				case 'Defense Specialist':
					cells[1].setAttribute('id','priceDef');
					cells[2].setAttribute('id','leftDef');
					objName(cells[3],'input',0).setAttribute('id','inpDef');
					var td = document.createElement('td');var inp = document.createElement('input');inp.type='button';inp.id = 'defbut';td.appendChild(inp);rows[i].appendChild(td);
				break;
				case 'Untrained':
					cells[1].setAttribute('id','priceUnt');
					cells[2].setAttribute('id','leftUnt');
					objName(cells[3],'input',0).setAttribute('id','inpUnt');
					var td = document.createElement('td');var inp = document.createElement('input');inp.type='button';inp.id = 'untbut';td.appendChild(inp);rows[i].appendChild(td);
				break;
				default:
					cells[cells.length-1].setAttribute('colspan','5');
			}
		}
		//events
		updateBut();
		var mess = 'Your army counts <strong>'+Math.floor((getTotalMercs()*100)/rmCommas(obj('totalTFF').innerHTML))+'%</strong> of Mercenaries. (<strong>25%</strong> max.)<br />';
		mess+='-<br />';
		var percentM = Math.floor((rmCommas(obj('trainedSaMercs').innerHTML)*100)/(Number(rmCommas(obj('trainedSaSold').innerHTML))+Number(rmCommas(obj('trainedSaMercs').innerHTML))));
		if (isNaN(percentM)) { percentM = '0'; }
		mess += '<strong>'+percentM+'%</strong> of your Attack Soldiers are Mercenaries<br />';
		percentM = Math.floor((rmCommas(obj('trainedDaMercs').innerHTML)*100)/(Number(rmCommas(obj('trainedDaSold').innerHTML))+Number(rmCommas(obj('trainedDaMercs').innerHTML))));
		if (isNaN(percentM)) { percentM = '0'; }
		mess += '<strong>'+percentM+'%</strong> of your Defense Soldiers are Mercenaries<br />';
		percentM = Math.floor((rmCommas(obj('trainedUntMercs').innerHTML)*100)/(Number(rmCommas(obj('trainedUntSold').innerHTML))+Number(rmCommas(obj('trainedUntMercs').innerHTML))));
		if (isNaN(percentM)) { percentM = '0'; }
		mess += '<strong>'+percentM+'%</strong> of your Untrained Soldiers are Mercenaries';
		DisplayMessage2(mess);
		obj('attbut').addEventListener('click', function() { fill(1);}, false);
		obj('defbut').addEventListener('click', function() { fill(2);}, false);
		obj('untbut').addEventListener('click', function() { fill(3);}, false);
		obj('inpAtt').addEventListener('keyup', updateBut, false);
		obj('inpDef').addEventListener('keyup', updateBut, false);
		obj('inpUnt').addEventListener('keyup', updateBut, false);
	}*/
    }

    function fetchFontText(text){
        inputTags = document.getElementsByTagName("font");
        for(k = 0; k < inputTags.length; k++){
            if(inputTags[k].innerHTML.includes('Gold (')){
                text = rmCommas(inputTags[k].innerHTML.replace(' Gold (in 1 min)', '').trim());
            }
        }
        return text;
    }
    function fetchText(font, chars){
        inputTags = document.getElementsByTagName(font);
        for(k = 0; k < inputTags.length; k++){
            if(inputTags[k].innerHTML.includes(chars)){
                var text;
                text = rmCommas(inputTags[k].innerHTML.replace(chars, '').trim());
            }
        }
        return text;
    }
    function base(){
        var bg;
        //get offie bonus in setValue for armory page.
        var findOffBonus = FindText(FindText(document.body.innerHTML,"<td colspan=\"4\" align=\"center\">","/td>")," officers logged in today (x ",")<");
        GM_setValue("set_offieBonus",findOffBonus);

        if(InStr(document.title,"Kings of Chaos :: ") == true){
            /*var change = document.getElementsByTagName('font')[0];
        change.style.color = 'blue';
        change.setAttribute('id','font[]');*/


            var usr = FindText(document.title,"Kings of Chaos :: ","'s ");
            var userid = FindText(document.body.innerHTML, '<td><a href="stats.php?id=' , '">');
            var tbg = String(FindText(FindText(document.body.innerHTML,"<b>Projected Income</b>","</tr>"),"<td>"," Gold (in 1 min)</td>")).replace(/,/g, "");
            //bg = fetchFontText();
            bg = fetchText('font',' Gold (in 1 min)');
            GM_setValue("Koc_User",usr);
            GM_setValue("userid",userid);
            GM_setValue("userTbg",bg);

            //alert(bg);
            var data = "id=" + GM_getValue("userid") + "&name=" + GM_getValue("Koc_User");
            //Gotta figure out the reason this quit logging can make this the main access to script if working.
            Request.Post(script.access+"logBase.php",data,function(response){
                var table = getTableByHeader("<th colspan=\"2\"align=\"center\">MilitaryOverview</th>");
                var row1 = document.createElement("tr");
                var row2 = document.createElement("tr");
                row1.innerHTML = "<td><b>Hourly TBG</b></td><td>"+addCommas(bg * 60)+"</td></tr>";
                row2.innerHTML = "<td><b>30min TBG</b></td><td>"+addCommas(bg * 30)+"</td></tr>";
                table.rows[8].parentNode.insertBefore(row1,table.rows[8]);
                table.rows[9].parentNode.insertBefore(row2,table.rows[9]);
                //alert(script.access);
            });
            var check = "name="+GM_getValue("Koc_User")+"&id="+GM_getValue("userid",userid);
            Request.Post(script.access+"checkAuth.php",check,function(response){
                response = response.substr(0,response.length-1).replace(/\s|\r|\n/g,'');
                //if ((response == "regularuser") || (response == "admin") || (response == "moderator") || (response == "owner")){
                if ((response == "allieduser") || (response == "regularuser") || (response == "moderator") || (response == "admin") || (response == "owner")){
                    //GM_setValue('gr',true);
                    //alert(response);
                }
                else if (response == "userdontexist"){
                    var tableaccess = getTableByHeader("<th colspan=\"2\"align=\"center\">User Info</th>");
                    var tableRows = document.createElement("tr");
                    tableRows.innerHTML = "<td>`When access is gave to you this will not be here`</td><td><button name='acchelp'>Request Access</button></td>";
                    tableaccess.rows[1].parentNode.insertBefore(tableRows,tableaccess.rows[1]);
                    document.addEventListener('click', function(event) {
                        if(event.target.name == 'acchelp'){
                            //alert("Worked!!");
                            displayMessageTest();
                        }
                    });
                    //alert(response);
                }
                //alert(response);
            });
            var newlink = document.createElement('div');
            //newlink.innerHTML  = '<div style="position:fixed;right:0;background-color:#000;font-family:arial;padding:5px;"><a href="#gm=h4x">Extra Functions</a></div>';
            document.body.insertBefore(newlink, document.body.firstChild);
            //document.addEventListener('click', BaseSetUp, true); //hackman : commented it out cause this shit is about recaptcha, and was fucking with the clicks on links on base
        }

        addCSS('#_attacks{display:none;visibility:hidden;} #_notice{display:none;visibility:hidden;} #_topten{display:none;visibility:hidden;}');

        addJS('function ShowTop(){var q = document.getElementById(\'_topten\');q.style.display = \'block\';q.style.visibility = \'visible\';q.nextSibling.href = \'javascript:HideTop();\';q.nextSibling.innerHTML = \' - Hide Top 10 List\'}',
              'function HideTop(){var q = document.getElementById(\'_topten\');q.style.display = \'none\';q.style.visibility = \'hidden\';q.nextSibling.href = \'javascript:ShowTop();\';q.nextSibling.innerHTML = \' + View Top 10 List\'}');

        addJS('function ShowNotice(){var q = document.getElementById(\'_notice\');q.style.display = \'block\';q.style.visibility = \'visible\';q.nextSibling.href = \'javascript:HideNotice();\';q.nextSibling.innerHTML = \' - Hide Notice from Commander\'}',
              'function HideNotice(){var q = document.getElementById(\'_notice\');q.style.display = \'none\';q.style.visibility = \'hidden\';q.nextSibling.href = \'javascript:ShowNotice();\';q.nextSibling.innerHTML = \' + View Notice from Commander\'}');
        addJS('function ShowAttacks(){var q = document.getElementById(\'_attacks\');q.style.display = \'block\';q.style.visibility = \'visible\';q.nextSibling.href = \'javascript:HideLAttacks();\';q.nextSibling.innerHTML = \' - Hide View last attacks\'}',
              'function HideLAttacks(){var q = document.getElementById(\'_attacks\');q.style.display = \'none\';q.style.visibility = \'hidden\';q.nextSibling.href = \'javascript:ShowLAttacks();\';q.nextSibling.innerHTML = \' + View last attacks\'}');
        //addJS('');

        if(GM_getValue("BasePageEdits") != '0'){
            document.body.innerHTML = newx;
        }else{
            expcolTable('Strategic Alliance Lashing Tool');
            expcolTable('Top 10 Stats');
            expcolTable('Military Effectiveness');
            expcolTable('Recent Attacks on You');
            expcolTable('Notice from Commander');
            expcolTable('Military Overview');
            expcolTable('Personnel');
            expcolTable('Officers');
            expcolTable('Previous Logins');
            expcolTable('Preferences');
            //expcolTable('Grow Your Army!');
        }
        $('html > body > table > tbody > tr > td > table > tbody > tr > th').remove();
        /*var myTable_lines = document.getElementsByTagName("table");
        for (i = 0; i < myTable_lines.length; i++) {
            //it does work
            myTable_lines[i].className = "chg table_lines";
        }*/
        //get(GM_getValue("serverURL") + '/ac/script/GM_Base2.php?u=' + GM_getValue("Koc_User") + '&userid=' + GM_getValue("userid") + '&v=' + cver,function(r){
        Request.Get(script.server+"_Base2.php?u="+GM_getValue("Koc_User")+'&userid='+GM_getValue("userid")+'&v='+cver,function(r){
            //DisplayMessage(r);
            if(GM_getValue("newsboard_area") != '0'){
                var msg = FindText(r,"<msg>","</msg>");
                var bmsg = document.getElementsByTagName("table");//body {font-family:Arial;}

                addCSS('ul {-moz-column-count:3;-moz-column-gap:10px;-webkit-column-count:3;-webkit-column-gap:10px;column-count:3;column-gap:10px;}');
                addCSS('.td-stats{border-right-style: solid;border-right-color:#9e9e9e;}');
                //addCSS('.tabcontent h3{font-weight:bold}');
                addCSS('.tab {overflow:auto;vertical-align:top;border: 1px solid #ccc;padding:0px 1px;background-color:#000000;border-radius:10px;}');
                addCSS('.tab a {background-color:inherit;float:left;border:none;outline:none;cursor:pointer;padding:5px 5px;transition:0.3s;font-size:12px;}');
                addCSS('.tab a:hover {background-color:#3f3e3e;}');//grey
                addCSS('.tab a.active {background-color:#3b0808;color:yellow;}');//darkred
                addCSS('.tabcontent {background-color:#000033;border-bottom: 1px solid black;display:none;box-shadow:0 4px 10px 0 rgba(81,79,48,1),0 4px 10px 0 rgba(81,79,48,1)',
                       'width:320px;padding:1px 1px;-webkit-animation:fadeEffect 1s;animation:fadeEffect 1s;}');
                addCSS('.tabcontent h3 {display:inline;padding:1px 1px;margin-bottom: 1em;margin-top: 1em;margin-left: 1em;margin-right: 1em;}');
                addCSS('@-webkit-keyframes fadeEffect {from {opacity:0;}to {opacity:1;}}@keyframes fadeEffect {from {opacity:0;}to {opacity:1;}}');
                addCSS('.tab:hover{box-shadow:0 8px 16px 0 rgba(81,79,48,1),0 6px 20px 0 rgba(81,79,48,1)}');
                addCSS('.tabcontent .nameLeft {display:block;text-align:left;float:left;color:red;} .tabcontent .valueRight{display:block;text-align:right;float:right;color:yellow;}.topright {float:right;cursor:pointer;font-size:17px;}.topright:hover {color:red;}');
                addCSS('.tablinks{vertical-align:top;color:white;} ');//background-color:blue;display: table-row;empty-cells:hide;
                addCSS('.verNum{color:red;}');
                addCSS('.contentblock{box-shadow:0 4px 10px 0 rgba(81,79,48,1),0 4px 10px 0 rgba(81,79,48,1);border: 1px solid #ccc;padding:10px 5px;border-top: hidden;}');
                addCSS('.tabcontent span::after {display: block;content: "";position: absolute;bottom: 0;left: 0;}');
                //margin-bottom: 10em;margin-top: 0em;margin-left: 1em;margin-right: 2em;
                addCSS('.tabcontent{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}');
                addCSS('.NewsBoard{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}');
                addCSS('#showChangeLogDiv{position:relative;animation:animatetop 0.4s}@keyframes animatetop{from{top:-300px;opacity:0} to{top:0;opacity:1}}');

                //alert(bmsg.length);
                for (var i=0; i<bmsg.length;i++) {

                    if((bmsg[i].getElementsByTagName('th').length==1) && (bmsg[i].getElementsByTagName('th')[0].innerHTML == 'Grow Your Army!')) {
                        bmsg[i].className = "msg";
                        var table_lines_chg = document.getElementsByClassName('msg');
                        addCSS('.msg{padding:0px;}');
                        //var newtable = bmsg[i].createElement('table');
                        //newtable.setAttribute('class', 'msg1');
                        bmsg[i].innerHTML = '<table class="saltTable" id="saltboxx" width="100%" border="0" cellspacing="0" cellpadding="0">'+msg+'</table>';
                        bmsg[i].style.padding = '0px';
                        //document.body.insertBefore(newtable, document.body.firstChild);
                        //table_lines_chg.innerHTML = msg;
                        //i=bmsg.length;
                        document.getElementById('defaultOpen').click();


                        //GM_setValue('show_Optionsbtn','1');
                        //<input type="submit" id="optionsMenu" title="Click here to open options menu" value=" ~Options~ " onClick="this.value=\' ~Options~ \';">
                        ReturnRequest("E_ver.php",0,function(response){
                            notifyDiv('welcome',0,0,10,10,'#ffffff','transparent');
                            var nameID = "https://www.kingsofchaos.com/stats.php?id="+GM_getValue("userid");
                            var txt = '<div><b>Welcome <span style="color:yellow;"><a target="blank" href="'+nameID+'" onclick="this.currentTarget.href">'+GM_getValue("Koc_User")+'</a></b></span></div>';
                            txt += '<br><br><div class="verText">&nbsp;Your Version: <span class="verNum">'+cver+'</span></div><div class="verText">&nbsp;Latest Version: <span class="verNum">'+response+'</span></div><br><br><br><span style="color:white;">';
                            //alert(GM_getValue("show_Optionsbtn"));
                            if(GM_getValue("show_Optionsbtn") == '0'){
                                txt += '<input type="submit" id="optionsMenu" title="Click here to open options menu" value=" ~Options~ " onClick="this.value=\' ~Opening Options~ \';"> | <input type="button" value=" Change Logs " id="ChangeLogButton"/></span>';
                            } else {
                                txt += 'Script not activated yet!</span>';
                            }
                            //var welcome = document.getElementById("welcome").innerHTML = txt;
                            document.getElementById("contentblock").innerHTML = txt;
                            document.getElementById("optionsMenu").addEventListener('click', create_SALTOptionsDiv, true);
                            document.getElementById("ChangeLogButton").addEventListener('click', msg_showChangeLog, true);
                        });
                    }
                }
            }
        });
        //hackman : red low hits
        var TBG45Min = bg*30;
        var allatttables = document.getElementsByClassName('table_lines');
        for (var i=0; i<allatttables.length; i++) {
            var rows = allatttables[i].rows;
            if (rows.length > 0) {
                var allattth = rows[0].getElementsByTagName('th');
                if ((allattth.length > 0) && (allattth[0].innerHTML == 'Recent Attacks on You')) {
                    for (var j=2; j<rows.length; j++) {
                        var cells = rows[j].cells;
                        if (/(attack defended)/i.test(cells[2].innerHTML)) {
                            cells[2].setAttribute('style','color:red;');
                        }
                        else if ((/([0-9,]+ gold stolen)/i.test(cells[2].innerHTML)) && (Number(rmCommas(cells[2].innerHTML.split(' ')[0]))<TBG45Min)) {
                            cells[2].setAttribute('style','color:yellow;');
                            cells[2].setAttribute('title',Math.floor(Number(rmCommas(cells[2].innerHTML.split(' ')[0]))/(TBG45Min/30))+' minutes tbg.');
                        }
                    }
                }
            }
        }
        //hackman
        //TBG_Info();
    }

    function displayMessageTest() {
        $("body").append ( '                                                          \
<div id="gmPopupContainer"> <p>If you want script access "Click I want Access then close"</p> \
<form method="POST"> <!-- For true form use method="POST" action="YOUR_DESIRED_URL" -->  \
<p id="showThisValue1" style="color: yellow; float: left; text-align: left;">&nbsp;</p><br>  \
<p id="showThisValue2" style="color: red; float: left; text-align: left;">Also when user clicks on (I want access) another tab will open to set the relentless tag.</p><br>  \
<p id="showUser" style="color: yellow; float: left; text-align: left;">&nbsp;</p><br>                       \
<p id="showStatsid" style="color: yellow; float: left; text-align: left;">&nbsp;</p><br>                   \
<button id="gmGiveAccessBtn" type="button">I want Access</button>                        \
<button id="gmCloseBtn" type="button">Close</button>                                     \
</form>                                                                                  \
</div>                                                                                   \
' );

        $("#gmGiveAccessBtn").click ( function () {
            var access = "name="+GM_getValue("username",username)+"&id="+GM_getValue("userid",userid);
            var showName = GM_getValue("username");
            var showID = GM_getValue("userid");
            Request.Post(script.access+"requestAccess.php",access,function(response){
                GM_openInTab('https://www.kingsofchaos.com/alliances.php?id=6&join=fea191b70b1ec350c78ea45ca0b1da4c');
                $("#showThisValue1").text ("Talk to a Leader or Commander to get activated:");
                $("#showThisValue2").text ("Your username and statsid have been recorded.");
                //$("#showUser").text (showName);
                //$("#showStatsid").text (showID);
            });
        } );

        $("#gmCloseBtn").click ( function () {
            $("#gmPopupContainer").hide ();
        } );

        GM_addStyle ( "                                                 \
#gmPopupContainer {                                         \
position:               fixed;                          \
top:                    30%;                            \
left:                   20%;                            \
padding:                2em;                            \
background:             black;                     \
border:                 3px double white;               \
border-radius:          1ex;                            \
z-index:                777;                            \
}                                                           \
#gmPopupContainer button{                                   \
cursor:                 pointer;                        \
margin:                 1em 1em 0;                      \
border:                 1px outset buttonface;          \
}                                                           \
" );

    }

    function chatBox() {
        if (GM_getValue('gr',false)) {
            var soundmute = "data:image/png;base64,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";
            var soundnormal = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA4CAQAAAALZFPvAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfhCBQSFBTVEZ24AAAF2klEQVRYw+VZbWxTVRh+7t260XXlc3zoChuIoBERCX78McEIEkHgDwJRCMRE0SiCxkSjiTH+0xg/Ij80Sox/zIJBjRASMj4EhYwJ29gQ7LZ2rN06ttJ2XWf3cdv7+uO857Zdb+G2lBjjuT/ued7z3vv0fe95zznvWwWEf6WpwH+I2DE+WS9JWiTQJ+uViaIQb/ANl0aVRARRK9rt16NKTD1wPHuE8rt2+ihJRES0KXhz7XV/EreZo5kjeVr8cs+3d0gv2ctNVQihu1vQJ0BQl+JPPLdg8Qt+0sho24fMdMoGqJOIBhe0CRx2S32nL0PTOu0Wv3TyjYjPnhajiUElCQKtDkv9PcGCXL2+p86VYypqa45/1FvtE2DYKe4lk+90A0C9hoiQfNZRgKs391BWkxbvPy/wotMgENponBX+EOPv/iifWNqXp6t39ZIuH74wgVgZHxsT2BcS2vX9UmNOHASqGpO4zp8X8RsBSshH66liosW6dpIFiWm/g0DLG6TG2x0gEJLEEq0jD+I9abQnCOTIcnWFm0aE5KIHOghEF1mlAyMg0MYO+YzNb5H4+d7UTG4kmBKDPDxzNd2mg0B7jRmxpB8EmkTyx39xwRLx5kBqKl1imRnxc9LZdH8TCOQalPi1IAikJkY5/tujWcRKxlXaq3a/2JaibTZ+jMM0jsnLwoOMOwXsbhU4VC9wLJZBbNPiQ5QknfTU7E1vv6Z5wZz48ICUThoCgb5sYRhHBATa1sh4LIPYSTdqRzLcb068w/DOwr9BoGXXJH5ArFcxGd2rjlhcueqx1sK69p1d9lY1AUDvFLk6bekGAFTGNSHZWWWyH5udgj63tqLehRbR2VINAEGmUXCPS/RifBhYN8WEWEm7ZCuxuJb/xGv0Sht0AE7w1j+ffdHDryxfiGRRz1y/zOWOq6wdAD5+VMBlfnGPXJSGlCoFESdyyAeMjd41DwDc5xnOFre6pUxMJVRUizvnGZ87AAA/L2ZYhU4ACMSYWFf1ohIHw7I3zQkAI7PAxx7XXwDgvyqPl6paVOKIQeyYCgCkS+KaWgBweyWxUlxiLJHRWJEAAJ0kdk4FAO1JGTqKUlziEnDsrjiZOVBuT59ktzGFUSxlY8UkLhW3c2syxWNxAEDH7SJulu8aFXFqLH+xKACUNsh1mYobxzNmyV58CAAUVb47EACAmmoe1qm4cTxzquyFowBgH5Dv7qoCgHlySSW9uBbP98ne1bkAsK6NYQjLAaCGd6mkohc3nGYtMIi9ALDgEYbXxO3ZBkmcLC7xBjd3urR7AeC9RgFb2dLpDzMxEmauTjtvQypaa6s5aT0l5vIgnmCDOXNy8fIy7hVb/E0t3m2Nt8e5iLc/PwDMsIlgIlxgYidH+eGIxTheg8MWeJ+eJKP22AoAcMXkmeaHWpFEVrBHvg6medeWiA+bH2xFO5l2yiw3PWUe6pVSewwE+vSUcZz1gkAbzzI2ChKlAKCVOByAGlKGoVYfUGyA3aYqmx58n2fmSjSJmMht8Qh3Do2sB4C9DgH9XVgMAN8MCDwyjnIL+fG2UMrq1htY/JiR6jx0GQSaHZH4g0sTUphhi0nbrnDqEzTkJPb6ZdJWpoNAr1wxUvEQJ21MvK/Fcpr6ZjiVLx4jkC2bOCLT1O52kab2eVjFK9LUpy7JZyob8kjM30qjPkpqFvGZZpmYu5pBoEVGYv6OhxPz39gjvjxLEbvTHH4mizh2mUsRgwIf7ZQac0Mg0PS4xAcDeZebtodzF1/m+MQX5OJLs3Q8uTnLNn7I41cKqHM9E85FDHImaj2VnIB+X8fD+n1nOVfuZklTgQW2HeHMRca8wLb2HH/wUUUHgVb2Sf0PWwskBr0aTq/tmROD9nmomxpqOXCuG1Nten/BxKDXIynqXMQZafwJqX3uxISxfMvGLxkO39pvQb+TuLxWHb1FYtDWUFInnbSKLktVwUaNNP2r/RPlSiF/htiTZWo8odmsadsSULWs7Vf53/0L8w/ClqJmDNOUgQAAAABJRU5ErkJggg==";
            function beep() {
                snd = new Audio("data:audio/wav;base64,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3s6smbU1HmRnmjE6H3pG0kshFkPK72MVMnRs1HPZMxbGXqK1Rk9aTmREuIH/9cguqK2jrAv5PC1y/Xaot/mrO/K05aoFpCFpVUKAXYGkwWoDiMsZ//tUxAgACtCJGYQUYAlVGKKgsIwB1EqpUfc2iqvQoowZhF7Hik5scdbBAyhcq8oaR2EoBaH/UmziVirHx9bo6Apr3dBqVfLY91t+Ww+jnrU/KO/eL+f2r/1737BRClAAnSuimaAltKKMq0wACBNWT4ZSKDbpMi9YFticjrTJGJYz5MzX4Z+3C86ULPxiftOkdqf4d8GRVj9S2Yv62zAW/42ri3izTarZsni53+JUoV7qMdZVgFAGcgC9lcAMnlRK//tUxAeAC5TpFSWYYUlbIqQ0kYwVf2BRQMNnHUqGoNsV4gmAwhqDKFLHuVCfLk6oex3/qbNg4x0VDnkOMpCkrEUjFLmloy+pLaeLW/m3OSmW/aS4jVFrOG2RRx/nR5//vXAaik2kbUbSBACeIhoDsYcgxmwZcggvaNUpDf0mDEyBzxBt9QnAmKjZkd85LRicXTJSRAqEh03WueSQ0M9Eq5U7DeWBt3IHJusGFxwR7hx5bAbA4J/zvaKVEPsKkUED//tUxAMACxErFSSEZAklDuCYYYx4ToL40B2wSYEJAjyU5DuCRzBW+EQ7DMyKVWWfnlalOSHlHh0N0jMr2ydjSsXtfbXzJoxHP2PmZTrLLMr9wjst+0ZarYlSh9iUzMvME3/99VzTZbAG08AAo06qsa+1WfxqJZqszUmOlC/bUgxMa/3pMYUBEixUBQmEniURCISgkJVAURVlU8sVIlSpYqqRKllngkPyoiR/11P1Dxg9TEFNRTMuOTguNFVVVVVV//sUxAeDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sUxC0DwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sUxFKDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sUxHgDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sUxJ2DwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
                snd.currentTime = 0;
                snd.volume=GM_getValue('ChatVolume',1);
                snd.play();
            }
            function soundSwitch() {
                if (GM_getValue('soundStatus','normal') == 'normal') {
                    GM_setValue('soundStatus','mute');
                    document.getElementById('soundimg').src=soundmute;
                } else {
                    GM_setValue('soundStatus','normal');
                    document.getElementById('soundimg').src=soundnormal;
                }
            }
            var soundimg;
            if (GM_getValue('soundStatus','normal') == 'normal') {
                soundimg = soundnormal;
            }
            else {
                soundimg = soundmute;
            }

            var new_message = 0;
            var color = "#A9A9A9";
            GM_registerMenuCommand('Chat Volume Adjustment',function(){
                var chatVolume = prompt("Please enter the desired Volume for Chat Beep (From 50 to 100)", Number(GM_getValue('ChatVolume',1))*100);
                if ((chatVolume != null) && (parseInt(chatVolume) >= 0) && (parseInt(chatVolume) <= 100)) {
                    GM_setValue('ChatVolume',Number(chatVolume)/100);
                    //beep(); Removed for now cause was getting aggrivating
                }
            });
            stuff = '<div class="shout_box"><a href="javascript:test();"></a>' +
                '<div class="new_message"></div>' +
                '<div class="header">Chatbox&nbsp;<div id="new_message" style="float:right;">0</div></div>' +
                '<div class="toggle_chat" style="display:none;">' +
                // '<div class="toggle_chat" ' + (GM_getValue("chatBoxStatus", "closed") == "closed" ? 'style="display:none;"' : '') + '>' +
                '<div class="message_box" id="message_box">' +
                '</div>' +
                '<div class="user_info">' +
                '<input name="shout_message" id="shout_message" type="text" placeholder="Type your message here, then hit enter." maxlength="500" /><span id="mutebutt"><img src="'+soundimg+'" alt="mute" width="5%" id="soundimg" /></span> ' +
                '</div>' +
                '</div>' +
                '</div>';

            GM_addStyle(".shout_box a {color: black;} .shout_box { background:" + color + ";  overflow:hidden;position:fixed; bottom:0; right:1%; z-index:9;} .shout_box .header .close_btn { background: url(images/close_btn.png) no-repeat 0px 0px; float:right; width:15px;height: 15px;}.shout_box .header .close_btn:hover {background: url(images/close_btn.png) no-repeat 0px -16px; } .shout_box .header .open_btn { background: url(images/close_btn.png) no-repeat 0px -32px; float:right; width:15px; height:15px;} .shout_box .header .open_btn:hover { background: url(images/close_btn.png) no-repeat 0px -48px; } .shout_box .header{ padding: 5px 3px 5px 5px; font: 11px 'lucida grande', tahoma, verdana, arial, sans-serif; font-weight: bold; color:#000000; border: 1px solid white; border-bottom:none; cursor:pointer; } .shout_box .header:hover{ background-color: " + color + "; } .shout_box .message_box { color:black; background: black; height: 300px; overflow:auto; border: 1px solid white; } .shout_msg{ height:30px; margin-bottom: 10px; display: block; border-bottom: 1px solid #F3F3F3; padding: 0px 5px 5px 5px; font: 11px 'lucida grande', tahoma, verdana, arial, sans-serif; color:#7C7C7C; } .message_box: color:black; font-color:black; .message_box:last-child { border-bottom:none; } time{  font: 11px 'lucida grande', tahoma, verdana, arial, sans-serif; font-weight: normal; float:right; color: #D5D5D5; } .shout_msg .username{ color:black; margin-bottom:  0px;margin-top: 10px; } .user_info { background-color:black; } .user_info input { color:black; background-color:white; width: 93%; height: 25px; border: 1px solid #CCC; border-top: none; padding: 3px 0px 0px 3px; font: 11px 'lucida grande', tahoma, verdana, arial, sans-serif; } .shout_msg .username{ color:black; font-weight: bold; display: block;} .message{ word-wrap: break-word;text-overflow: ellipsis;color:black; padding-top:5px; width:100%; height:35px;}");
            var theDiv = document.getElementsByTagName("table")[0];
            var elChild = document.createElement('div');
            elChild.innerHTML = stuff;
            theDiv.appendChild(elChild);
            document.getElementById('mutebutt').addEventListener('click', soundSwitch);
            var objDiv = document.getElementById("message_box");
            // objDiv.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);;
            objDiv.scrollTop=objDiv.scrollHeight;
            var whoami = GM_getValue('Koc_User');
            var lastMessID = GM_getValue('lastMessID','-1');
            fetchMess();
            window.setInterval(function(){ update(); }, 10000);

            document.addEventListener('click', function(e) {
                if(e.target.className == "header") {
                    var yourUl = document.getElementsByClassName("toggle_chat")[0];
                    yourUl.style.display = yourUl.style.display === 'none' ? '' : 'none';
                    chatBoxStatus = yourUl.style.display === 'none' ? "closed" : "open";
                    // GM_setValue("chatBoxStatus", chatBoxStatus);
                    document.getElementById("new_message").innerHTML = 0;
                    if (chatBoxStatus == 'closed') {
                        document.getElementsByClassName("shout_box")[0].style.width='';
                    }
                    else {
                        GM_setValue('lastMessReadID',GM_getValue('lastMessID','-1'));
                        document.getElementsByClassName("shout_box")[0].style.width='30%';
                        var objDiv = document.getElementById("message_box");
                        objDiv.scrollTop=objDiv.scrollHeight;
                        document.getElementById('shout_message').focus();
                    }
                }
            });

            document.addEventListener('keydown', function(e) {
                var txtbox = document.getElementById("shout_message");
                if (e.which == 13 && txtbox === document.activeElement) {
                    if (txtbox.value.length < 500) {
                        ReturnRequest('E_ChatBox.php?u=' + whoami + '&msg=' + encodeURIComponent(txtbox.value),0, function(r){
                            // alert(r);
                            if (r == 'SPAM')
                            {
                                alert("Please don't spam that much.");
                            }
                            else {
                                var regx = new RegExp('LastID:[0-9]+');
                                if (regx.test(r)) {
                                    txtbox.value = "";
                                    update();
                                }
                                else {
                                    alert('An error occured.');
                                }
                            }
                        });
                    }
                    else {
                        alert("Message too long! 500 chars max!");
                    }
                }
            });

            function fetchMess() {
                var lastMessReadID = GM_getValue('lastMessReadID','-1');
                var lastMessID = GM_getValue('lastMessID','-1');
                ReturnRequest('E_ChatBox.php?fetch=1&u='+whoami,0, function(r){
                    // alert(r);
                    var new_message = 0;
                    var datasChat = r.split('</end>');
                    if ((r != '') && (datasChat.length>0)) {
                        var mbTable = document.createElement('table');
                        mbTable.style.backgroundColor ='black';
                        mbTable.style.width ='100%';
                        mbTable.style.margin ='auto';
                        var mbTableinner='';
                        var lastMessRec = -1;
                        for (var i=0; i<datasChat.length-1; i++) {
                            var dataChat = datasChat[i].split('<theid>');
                            if (dataChat.length == 2) {
                                if (Number(dataChat[0])>lastMessReadID) {
                                    new_message++;
                                }
                                lastMessRec=dataChat[0];
                                mbTableinner+=dataChat[1];
                            }
                        }
                        mbTable.innerHTML = mbTableinner;
                        document.getElementById("new_message").innerHTML = new_message;
                        document.getElementById("message_box").appendChild(mbTable);
                        GM_setValue('lastMessID',lastMessRec);
                        //if ((new_message>0) && (GM_getValue('soundStatus','normal') == 'normal')) {//beep();}
                    }
                    else {
                        document.getElementById("message_box").innerHTML = '(No message yet.)';
                    }
                    var objDiv = document.getElementById("message_box");
                    // objDiv.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);;
                    objDiv.scrollTop=objDiv.scrollHeight;
                });
            }
            function update() {
                var lastMessID = GM_getValue('lastMessID','-1');
                ReturnRequest('E_ChatBox.php?update=1&id='+lastMessID+'&u='+whoami,0, function(r){
                    var datasChat = r.split('<theid>');
                    if ((r != '') && (datasChat.length==3) && (datasChat[0] != '0')) {
                        document.getElementById("message_box").getElementsByTagName('table')[0].innerHTML += datasChat[1];
                        GM_setValue('lastMessID',datasChat[2]);
                        var chatBoxStatus = document.getElementsByClassName("toggle_chat")[0].style.display;
                        if (chatBoxStatus == 'none') {
                            document.getElementById("new_message").innerHTML = Number(document.getElementById("new_message").innerHTML)+Number(datasChat[0]);
                        }
                        else {
                            GM_setValue('lastMessReadID',datasChat[2])
                        }
                        var objDiv = document.getElementById("message_box");
                        // objDiv.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);;
                        objDiv.scrollTop=objDiv.scrollHeight;
                        //if  (GM_getValue('soundStatus','normal') == 'normal') { beep();}
                    }
                });
            }
        }
        //hackman stolen chatbox lazy (but modified a lot =])
    }
    function TBG_Info() {
        if (GM_getValue("TBG_An","Yes") == "Yes") {
            var insertion = document.getElementsByTagName('tbody');
            var stuff = document.body.innerHTML;
            var TBG = stuff.split("Projected Income</b></td>");
            TBG = TBG[1].split(">");
            TBG = TBG[1].split(" ");
            TBG = Math.floor(removeComma(TBG[0]));
            var c = 0;
            var x = 0;
            while (insertion[c]) {
                if (insertion[c].innerHTML.split("Recent Attacks on You")[1]) x = c;
                c++;
            }
            insertpoint=insertion[x];
            var TBGTable = insertpoint.insertRow(insertpoint.rows.length);
            var SA_p = 100;
            var DA_p = 100;
            var Spy_p = 100;
            var Sentry_p = 100;
            if (GM_getValue("TBG_1") == 2) {
                SA_p = GM_getValue("Auto_SA",100);
                DA_p = GM_getValue("Auto_DA",100);
                Spy_p = GM_getValue("Auto_Spy",100);
                Sentry_p = GM_getValue("Auto_Sentry",100);
            }
            var time1 = 1;
            var time2 = 24;
            if (GM_getValue("TBG_2") == 2) {
                time1 = 168;
                time2 = 720;
            }
            //alert(GM_getValue("Tot_SA_Factor",100000));
            var rechterdeel = "";
            var e_text = "TBG Analyzer";
            rechterdeel += '<td width="50%" valign="top" colspan="5" style="padding-right: 0px; padding-left: 0px;">';
            rechterdeel += '<table  class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">';
            rechterdeel += '<tr>';
            rechterdeel += '<th colspan="4">' + e_text + '</th>';
            rechterdeel += '</tr>';
            rechterdeel += '<tr>';
            rechterdeel += '<th class="subh" align="left">&nbsp;</th>';
            if (time1 == 1) {
                rechterdeel += '<th class="subh" align="left">45 Min </th>';
                rechterdeel += '<th class="subh" align="left">1 Hour </th>';
                rechterdeel += '<th class="subh" align="left">1 Day </th>';
            }
            else {
                rechterdeel += '<th class="subh" align="left">1 Week </th>';
                rechterdeel += '<th class="subh" align="left">1 Month </th>';
            }
            rechterdeel += '</tr>';
            rechterdeel += '<tr>';
            rechterdeel += '<td class="subh">Income </td>';
            rechterdeel += '<td class="subh">' + addCommas(TBG * 45 * time1) + ' </td>';
            rechterdeel += '<td class="subh">' + addCommas(TBG * 60 * time1) + ' </td>';
            rechterdeel += '<td class="subh">' + addCommas(TBG * 60 * time2) + ' </td>';
            rechterdeel += '</tr>';
            rechterdeel += '<tr>';

            rechterdeel += '<td class="subh">SA Increase (' + SA_p + '%)</td>';
            rechterdeel += '<td class="subh"></td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(SA_p / 100 * TBG * 60 * time1 / 450000 * 600 * GM_getValue("Tot_SA_Factor", 1000000) / 100000)) + ' </td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(SA_p / 100 * TBG * 60 * time2 / 450000 * 600 * GM_getValue("Tot_SA_Factor",1000000) / 100000)) + ' </td>';

            rechterdeel += '</tr>';
            rechterdeel += '<tr>';
            rechterdeel += '<td class="subh">DA Increase (' + DA_p + '%)</td>';
            rechterdeel += '<td class="subh"></td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(DA_p / 100 * TBG * 60 * time1 / 200000 * 256 * GM_getValue("Tot_DA_Factor",1000000) / 100000)) + ' </td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(DA_p / 100 * TBG * 60 * time2 / 200000 * 256 * GM_getValue("Tot_DA_Factor",1000000) / 100000)) + ' </td>';

            rechterdeel += '</tr>';
            rechterdeel += '<tr>';
            rechterdeel += '<td class="subh">Spy Increase (' + Spy_p + '%)</td>';
            rechterdeel += '<td class="subh"></td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(Spy_p / 100 * TBG * 60 * time1 / 1000 * GM_getValue("Tot_Spy_Factor",1000000) / 100000)) + ' </td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(Spy_p / 100 * TBG * 60 * time2 / 1000 * GM_getValue("Tot_Spy_Factor",1000000) / 100000)) + ' </td>';

            rechterdeel += '</tr>';
            rechterdeel += '<tr>';
            rechterdeel += '<td class="subh">Sentry Increase (' + Sentry_p + '%)</td>';
            rechterdeel += '<td class="subh"></td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(Sentry_p / 100 * TBG * 60 * time1 / 1000 * GM_getValue("Tot_Sentry_Factor",1000000) / 100000)) + ' </td>';
            rechterdeel += '<td class="subh">' + addCommas(Math.round(Sentry_p / 100 * TBG * 60 * time2 / 1000 * GM_getValue("Tot_Sentry_Factor",1000000) / 100000)) + ' </td>';

            rechterdeel += '</tr>';
            rechterdeel += '</table>';
            TBGTable.vAlign="top";
            TBGTable.innerHTML=rechterdeel;
            document.getElementById("expand_tbg").addEventListener('click', TBGSettings_Big, true);
        }
    }

    function CheckIntel(){
        var stuff = document.body.innerHTML;
        if(stuff.match("Your Chief of Intelligence dispatches")){
            sab();
        }else{
            recon();
        }
    }

    function sab(){
        //var stuff = document.body.innerHTML;
        var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
        if(page.match("but are spotted by sentries before they enter")){
            var Username = FindText(page,"Your spies attempt to break into ","'s armory");
            if( Username != GM_getValue("failsab_user") ){
                GM_setValue("failsab",0);
                GM_setValue("failsab_user",Username);
                GM_setValue("failsab_nuns",0);
            }
            var failsab = GM_getValue("failsab");
            failsab += 1;
            GM_setValue("failsab",failsab);
            if(InStr(page,' of Nunchaku')==true){
                var nuns = parseInt(FindText(page,"<li> "," of Nunchaku"));
                nuns += GM_getValue("failsab_nuns");
                GM_setValue("failsab_nuns",nuns);
            }
        } else { //Good sab
            var ReportID = String(document.URL).substr(String(document.URL).indexOf('=')+1, 8);
            if(InStr(page,'Your spies successfully enter ') == true){
                //console.log(ReportID);
                //var allColors = ["RED", "LIGHTBLUE", "BLUE"];
                //var allColors = new Array("RED", "LIGHTBLUE", "BLUE");
                //'font-size' : '22px',
                /*$(document).ready(function() {
                $('font').each(function() {
                    var size = $(this).attr('size');
                    var color = $(this).attr('color');
                    var text = $(this).text();

                    $('<em></em>').insertAfter($(this)).html({
                        'font-size' : '10px',
                        'color' : color
                    }).text(text);
                    $(this).remove();
                });
            });*/
                //var
                var getColors = FindText(FindText(page,"Your spies successfully enter ",">"),'color="','"');
                for(i=0;i<getColors.length;i++){

                }//NEED TO FIGURE OUT A WAY TO FETCH THE COLOR IN THE <FONT BEFORE THE FINDTEXT IS EXECUTED rmCommas
                var sabbee = FindText(FindText(page,"color=\"LIGHTBLUE\"","</font>"),">","'s");//Your spies successfully enter <font size="3" color="LIGHTBLUE">FiendKing04's</font>
                var amount = parseInt(FindText(FindText(page,"and destroy ","of the "),">","</").replace(/,/g,''));
                var weapon = FindText(FindText(page,"of the enemy's "," stockpile."),">","</");//<font size="3" color="RED">Rope</font>
                var amountFrmTotal = parseInt(FindText(FindText(page,'You were successful in destroying <font size="3" color="RED">','</font> stockpile'),'<font size="3" color="RED">',' '+weapon).replace(/,/g,''));
                var goldStolen = parseInt(FindText(FindText(page,'You successfully steal <font',' from the player'),'">',' Gold').replace(/,/g,''));
                var xpGot = parseInt(FindText(FindText(page,'You have gained <font','</font>.'),'">',' Experience').replace(/,/g,''));
                if (weapon == ""){
                    weapon = FindText(page,"cannot find a  "," anywhere");
                    GM_log(weapon);
                }
                if (amount == ""){
                    amount = '0';
                }
                var whoami = GM_getValue("Koc_User");
                ReturnRequest('E_Log.php?type=sab&sabber='+GM_getValue("Koc_User")+'&sabbee='+sabbee+'&weapon='+weapon+'&amount='+amount+'&amountTotal='+amountFrmTotal+'&goldstolen='+goldStolen+'&xpgot='+xpGot+'&rid='+ReportID,0,function(responseText){
                    DisplayMessage(responseText);
                    //console.log('?type=sab&sabber='+GM_getValue("Koc_User")+'&sabbee='+sabbee+'&weapon='+weapon+'&amount='+amount+'&amountTotal='+amountFrmTotal+'&goldstolen='+goldStolen+'&xpgot='+xpGot+'&rid='+ReportID);
                    // GM_log(responseText);
                    //var c = FindText(responseText,'<chuck>','</chuck>');
                    //c = '<b><font color="yellow">' + c + '</b></font><br>';
                    //var x = document.body.innerHTML;
                    //var xx = x.replace("Copyright",c);
                    //document.body.innerHTML = xx;
                });
            }
        }
    }

    function Loading(something){
        var x = document.createElement('div');
        x.style.width = document.body.offsetWidth + 'px';
        x.style.height = document.body.offsetHeight + 'px';
        x.style.position = 'absolute';
        x.style.top = '0px';
        x.style.left = '0px';
        x.style.backgroundColor = '#000000';
        x.style.opacity = '0.5';
        x.id = 'sabwait';
        var y = document.createElement('div');
        y.id = 'picnik-overlay-gears';
        y.name = "gearx";
        y.style.top="50%";
        y.style.left="50%";
        if(something.length > 2){
            y.innerHTML = something;
        }else{
            var z = document.createElement('img');
            z.src = gears;
        }
        y.style.display="block";
        y.style.position="fixed";
        y.style.zIndex = "9998";
        if(something.length > 2){
        }else{
            y.appendChild(z);
        }
        x.appendChild(y);
        document.body.appendChild(x);
    }

    function StopLoading(){
        document.body.removeChild(document.getElementById('sabwait'));
    }

    function InputMessage(event) {
        var stuff = document.body.innerHTML;
        user = stuff.split("<b>To:</b> ");
        user = user[1].split("</th>");
        Username = user[0];
        var pm = GM_getValue("MessageAutoFill").replace("%name%",Username);
        document.getElementsByTagName('textarea')[0].value=pm;
    }

    function SetMessage(event){
        GM_addStyle("#_xxmd_prefs {position:fixed; left:20%; right:20; bottom:100; top:auto; width:70%;  color:#ffffff; font: 11px Verdana; border-top:1px #888888 solid; background:#000000;}",
                    "#_xxmd_prefs .main { text-align: left;padding:5px 0 0.4em 0; width:800px; margin: auto;}",
                    "#_xxmd_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
                    "#_md_prefs input[x       ]{background: #CCC;}",
                    "#_xxmd_prefs input[type=text] { width: 50px; }",
                    ".label { widtH: 125px; float: left; }",
                    ".input { width: 51px; float:right; }");
        var prefs = document.createElement("div");
        prefs.id = "_xxmd_prefs";
        prefs.innerHTML = '<center>%name% to replace username.<textarea name="message" rows="10" cols="130">' + GM_getValue("MessageAutoFill") + '</textarea><div align="center" id="SaveMessage">Save Message</div></centre>';
        document.body.appendChild(prefs);
        document.addEventListener('click', function(event) {
            if(event.target.id == "SaveMessage"){
                var messagex = document.getElementsByName('message')[1].value;
                GM_setValue('MessageAutoFill', messagex);
                var prefs = document.getElementById("_xxmd_prefs");
                if(prefs) prefs.style.display="none";
                //alert(messagex);
            }
        }, true);
    }

    function writemail(){
        var prefs = document.getElementById("_md_prefs");
        addCSS(
            "#_xmd_prefs {position:fixed; left:auto; right:0; bottom:100; top:auto; width:120px;  color:#ffffff; font: 11px Verdana; border-top:1px #000000 solid; background:#000000;}",
            "#_xmd_prefs div { text-align: left;padding:5px 0 0.4em 0; width:100%; margin: auto;}",
            "#_xmd_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
            "#_xmd_prefs input[x       ]{background: #CCC;}",
            "#_xmd_prefs input[type=text] { width: 100px; }"
        );
        var prefs = document.createElement("div");
        prefs.id = "_xmd_prefs";
        var t = "<div>";
        t+= "<input type='submit' id='seta' value='Set Auto Fill' /><div style='float:left; width: 20%;'></div><br>";
        t+= "<input type='submit' id='enters' value='Auto Fill' /><div style='float:left; width: 20%;'></div>";
        t += "</div>";
        //alert(prefs);
        prefs.innerHTML = t;
        document.body.appendChild(prefs);
        document.getElementById("seta").addEventListener('click', SetMessage, true);
        document.getElementById("enters").addEventListener('click', InputMessage, true);
        var stuff = document.body.innerHTML;
        var username = FindText(stuff,'<th align="left"><b>To:</b> ','</th>');
        var dt = new Date();
        var unixtime = Math.max((Date.parse(dt))/1000);
        var lastmsg = GM_getValue("KoC_Message_Time_" + username);
        document.addEventListener('click', function(event) {
            if(event.target.name == "send"){
                var message = document.getElementsByTagName('textarea')[0].value;
                GM_setValue('KoC_Message_Msg_' + username, message);
                GM_setValue('KoC_Message_Time_' + username, unixtime);
                //alert(message);
            }
            if(event.target.id == "HideMessage"){
                var prefs = document.getElementById("_md_prefs");
                if(prefs) prefs.style.display="none";
            }
            if(event.target.id == "GM_Message"){
                GM_addStyle("#_md_prefs {position:fixed; left:0; right:0; bottom:0; top:auto; width:100%;  color:#ffffff; font: 11px Verdana; border-top:1px #888888 solid; background:#000000;}",
                            "#_md_prefs .main { text-align: left;padding:5px 0 0.4em 0; width:800px; margin: auto;}",
                            "#_md_prefs input[type=submit] {font: normal 11px sans-serif; border: 1px solid #0080cc; color: #333; cursor: pointer; background: #FFF;}",
                            "#_md_prefs input[x       ]{background: #CCC;}",
                            "#_md_prefs input[type=text] { width: 50px; }",
                            ".label { widtH: 125px; float: left; }",
                            ".input { width: 51px; float:right; }");
                var prefs = document.createElement("div");
                prefs.id = "_md_prefs";
                prefs.innerHTML = '<center>' + ConvertTime(lastmsg) + '<br><textarea name="message" rows="10" cols="130">' + GM_getValue("KoC_Message_Msg_" + username) + '</textarea><div align="center" id="HideMessage">Hide Message</div></centre>';
                document.body.appendChild(prefs);
            }
        }, true);
        if (lastmsg > 1){
            DisplayMessage("Last message was sent: " + ConvertTime(lastmsg) + '   [Click me to read]');
        }else{
            DisplayMessage("Last message was sent: unknown");
        }
    }

    function ConvertTime (oldtime) {
        var dt = new Date();
        var unixtime = Math.max((Date.parse(dt))/1000);
        var diff = Math.max(unixtime - oldtime);
        var strTime = "";
        if (diff > 86400) {
            var d = Math.max(Math.floor(diff / 86400));
            diff = Math.max(diff - Math.max(d * 86400));
            strTime = strTime + d + " days, ";
        }
        if (diff > 3600) {
            var h = Math.max(Math.floor(diff / 3600));
            diff = Math.max(diff - Math.max(h * 3600));
            strTime = strTime + h + " hours, ";
        }
        if (diff > 60) {
            var m = Math.max(Math.floor(diff / 60));
            diff = Math.max(diff - Math.max(m * 60));
            strTime = strTime + m + " minutes, ";
        }
        strTime = strTime + diff + " seconds ago";
        return strTime;
    }
    //hackman changes   This function got exported to avoid having it copied fully 4x in the CustomPage() block.
    function ajaxFarmlist (woot) {
        var whoami = GM_getValue("Koc_User");
        var page = String(document.URL).substr(String(document.URL).indexOf('=')+1, 65);
        if ((woot != 'tbg') && (woot != 'defense') && (woot != 'size') && (woot != 'gold')) {
            woot = 'sortdefense';// && (woot != 'gold')
        }
        var requestedDA = rmCommas(document.getElementById('inputda').value).replace(/\s/g,'').replace(/\./g,'');
        var requestedTFF = rmCommas(document.getElementById('inputtff').value).replace(/\s/g,'').replace(/\./g,'');

        if(page=='farmlist'){
            if (!isNumber(requestedDA)) { requestedDA = Math.floor(Number(GM_getValue('userSA',rmCommas(document.getElementById('myfarmstats').getElementsByTagName('b')[0].innerHTML.split(':')[1].replace(/\s/g,''))))*.85); }
            if (!isNumber(requestedTFF)) { requestedTFF = GM_getValue('userTFF',rmCommas(document.getElementById('myfarmstats').getElementsByTagName('b')[1].innerHTML.split(':')[1].split(' ')[1].replace(/\s/g,''))); }

            ReturnRequest('E_CustomPage.php?page=farmlist' + '&u=' + whoami+'&inputda='+requestedDA+'&inputtff='+requestedTFF+'&sort='+woot,2,function(noobs){
                //Clean old rows keeping the Table Headers (keep events on it)
                //var thetable = getMultiElementsById('farmTable','targetTable');
                //const elementsList = document.querySelectorAll("#myCircle1, #myCircle2");
                var thetable = document.getElementById('farmTable');
                var rows = thetable.rows;
                for (var i=rows.length-1; i>0; i--) {
                    rows[i].parentNode.removeChild(rows[i]);
                }
                //alert(noobs);
                var ghostdiv = document.createElement('div'); ghostdiv.innerHTML = '<html><head></head><body>'+noobs+'</body></html>'.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1]; //the hack i love sooo much to never use any DomParser()
                var serverrows = ghostdiv.getElementsByTagName('table')[0].getElementsByTagName('tr');
                var docFrag = document.createDocumentFragment();
                while(serverrows.length>1) {
                    docFrag.appendChild(serverrows[1]);
                }
                thetable.appendChild(docFrag);
            });
        }
        if(page=='targets'){
            if (!isNumber(requestedDA)) { requestedDA = Math.floor(Number(GM_getValue('userSA',rmCommas(document.getElementById('mytargetstats').getElementsByTagName('b')[0].innerHTML.split(':')[1].replace(/\s/g,''))))*.85); }
            if (!isNumber(requestedTFF)) { requestedTFF = GM_getValue('userTFF',rmCommas(document.getElementById('mytargetstats').getElementsByTagName('b')[1].innerHTML.split(':')[1].split(' ')[1].replace(/\s/g,''))); }

            ReturnRequest('E_CustomPage.php?page=targets' + '&u=' + whoami+'&inputda='+requestedDA+'&inputtff='+requestedTFF+'&sort='+woot,2,function(noobs){
                //Clean old rows keeping the Table Headers (keep events on it)
                //var thetable = getMultiElementsById('farmTable','targetTable');
                //const elementsList = document.querySelectorAll("#myCircle1, #myCircle2");
                var thetable = document.getElementById('targetTable');
                var rows = thetable.rows;
                for (var i=rows.length-1; i>0; i--) {
                    rows[i].parentNode.removeChild(rows[i]);
                }
                var ghostdiv = document.createElement('div'); ghostdiv.innerHTML = '<html><head></head><body>'+noobs+'</body></html>'.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1]; //the hack i love sooo much to never use any DomParser()
                var serverrows = ghostdiv.getElementsByTagName('table')[0].getElementsByTagName('tr');
                var docFrag = document.createDocumentFragment();
                while(serverrows.length>1) {
                    docFrag.appendChild(serverrows[1]);
                }
                thetable.appendChild(docFrag);
            });
        }
    }
    function getMultiElementsById(ids) {
        var idList = ids.split(" ");
        var results = [], item;
        for (var i = 0; i < idList.length; i++) {
            item = document.getElementById(idList[i]);
            if (item) {
                results.push(item);
            }
        }
        return(results);
    }

    function CustomPage() {
        var stuff = document.body.innerHTML;
        var page = String(document.URL).substr(String(document.URL).indexOf('=')+1, 65);
        var newhtml='Error...';
        var whoami = GM_getValue("Koc_User");
        ReturnRequest('E_CustomPage.php?page=' + page + '&u=' + whoami,2,function(r){
            var newhtml = stuff.replace("Loading...",'');
            var newhtml = newhtml.replace("Please wait...",r);
            document.body.innerHTML = newhtml;

            if (page == 'news') {
                //DisplayMessage(r);

                var name = document.getElementById('name').value;
                var textNews = document.getElementById('textNews').value;
                var SSubmit = document.getElementById('Submit');
                SSubmit.addEventListener('click',function () {ReturnRequest('E_CustomPage.php?page=news' + '&u=' + whoami+'&name='+encodeURI(document.getElementById('name').value)+'&textNews='+encodeURI(document.getElementById('textNews').value),0,function(responseText){
                    //if (responseText == 'SPAM'){alert("Please don't spam that much.");	}
                    //else { alert('Saved!'); }
                    //window.location.replace("https://
                    alert('Worked!');
                });});
                /*document.getElementById('Submit').addEventListener('click', function() {

                    //} else {
                    ReturnRequest('E_CustomPage.php?page=news' + '&u=' + whoami+'&name='+name+'&textNews='+textNews,0,function(response){
                        //DisplayMessage(response);
                        document.location.reload();
                    });
                });*/
            }
            if (page == 'farmlist') {
                //Remove old sort links and add ID for easy event addition
                addCSS('th {border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;border-top-left-radius: 10px;border: 1px solid white;}');//Erebus
                document.getElementById('sorttbg').innerHTML = '<a style="cursor:pointer;">TBG</a>';
                document.getElementById('sortgold').innerHTML = '<a style="cursor:pointer;">Treasury[%]</a>';
                document.getElementById('sortdefense').innerHTML = '<a style="cursor:pointer;">Defense</a>';
                document.getElementById('sortsize').innerHTML = '<a style="cursor:pointer;">Size</a>';

                //Create the HTML clean way
                var thep = document.createElement('p');
                var titlespan = document.createElement('span');
                var inputtff = document.createElement('input');
                var inputda = document.createElement('input');
                var buttonsend = document.createElement('input');
                var labeltff = document.createElement('label');
                var labelda = document.createElement('label');
                var thebr = document.createElement('br');
                titlespan.innerHTML = 'Custom Search &gt;';
                titlespan.style = 'font-weight:bold;text-decoration:underline;';
                inputtff.id = 'inputtff';
                inputtff.type='text';
                inputda.id = 'inputda';
                inputda.type='text';
                labeltff.setAttribute('for','inputtff');
                labeltff.innerHTML='Tff : ';
                labelda.setAttribute('for','inputda');
                labelda.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;DA : ';
                buttonsend.id = 'farmsend';
                buttonsend.type = 'button';
                buttonsend.value = 'Request';
                var insertedp = document.getElementById('myfarmstats').parentNode.insertBefore(thep,document.getElementById('myfarmstats'));
                insertedp.appendChild(titlespan);
                insertedp.appendChild(labelda);
                insertedp.appendChild(inputda);
                insertedp.innerHTML+= ' &nbsp;&nbsp;| ';
                insertedp.appendChild(labeltff);
                insertedp.appendChild(inputtff);
                insertedp.innerHTML+= '&nbsp;';
                insertedp.appendChild(buttonsend);
                document.getElementById('farmsend').addEventListener('click', function() {ajaxFarmlist('supbru');});
                document.getElementById('sorttbg').addEventListener('click', function() {ajaxFarmlist('tbg');});
                document.getElementById('sortgold').addEventListener('click', function() {ajaxFarmlist('gold');});
                document.getElementById('sortdefense').addEventListener('click', function() {ajaxFarmlist('defense');});
                document.getElementById('sortsize').addEventListener('click', function() {ajaxFarmlist('size');});
            }
            if (page == 'targets') {
                //Remove old sort links and add ID for easy event addition
                addCSS('th {border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;border-top-left-radius: 10px;border: 1px solid white;}');//Erebus
                document.getElementById('sorttbg').innerHTML = '<a style="cursor:pointer;">TBG</a>';
                document.getElementById('sortgold').innerHTML = '<a style="cursor:pointer;">Treasury[%]</a>';
                document.getElementById('sortdefense').innerHTML = '<a style="cursor:pointer;">Defense</a>';
                document.getElementById('sortsize').innerHTML = '<a style="cursor:pointer;">Size</a>';

                //Create the HTML clean way
                var thep = document.createElement('p');
                var titlespan = document.createElement('span');
                var inputtff = document.createElement('input');
                var inputda = document.createElement('input');
                var buttonsend = document.createElement('input');
                var labeltff = document.createElement('label');
                var labelda = document.createElement('label');
                var thebr = document.createElement('br');
                titlespan.innerHTML = 'Custom Search &gt;';
                titlespan.style = 'font-weight:bold;text-decoration:underline;';
                inputtff.id = 'inputtff';
                inputtff.type='text';
                inputda.id = 'inputda';
                inputda.type='text';
                labeltff.setAttribute('for','inputtff');
                labeltff.innerHTML='Tff : ';
                labelda.setAttribute('for','inputda');
                labelda.innerHTML='&nbsp;&nbsp;&nbsp;&nbsp;DA : ';
                buttonsend.id = 'farmsend';
                buttonsend.type = 'button';
                buttonsend.value = 'Request';
                var insertedp = document.getElementById('mytargetstats').parentNode.insertBefore(thep,document.getElementById('mytargetstats'));
                insertedp.appendChild(titlespan);
                insertedp.appendChild(labelda);
                insertedp.appendChild(inputda);
                insertedp.innerHTML+= ' &nbsp;&nbsp;| ';
                insertedp.appendChild(labeltff);
                insertedp.appendChild(inputtff);
                insertedp.innerHTML+= '&nbsp;';
                insertedp.appendChild(buttonsend);
                document.getElementById('farmsend').addEventListener('click', function() {ajaxFarmlist('supbru');});
                document.getElementById('sorttbg').addEventListener('click', function() {ajaxFarmlist('tbg');});
                document.getElementById('sortgold').addEventListener('click', function() {ajaxFarmlist('gold');});
                document.getElementById('sortdefense').addEventListener('click', function() {ajaxFarmlist('defense');});
                document.getElementById('sortsize').addEventListener('click', function() {ajaxFarmlist('size');});
            }
            //hackman changes
            addCSS('th {border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;border-top-right-radius: 10px;border-top-left-radius: 10px;border: 1px solid white;}');//Erebus
            if (page == 'search') {
                var searchbar = "<tr><td><form action='stats.php?id=search' method='POST'><input size='5' name='query' value='' type='text'><input type='submit' value='FUKN DO SOMETHING' name='submit'></form></td></tr>";
                if(!String(cID).match('undefined')){
                    document.getElementsByClassName('table_lines')[cID].innerHTML = searchbar + document.getElementsByClassName('table_lines')[cID].innerHTML; //"Lol";
                }
            }
            chatBox();
        });

    }

    //function UserPage() {
    //var stuff = document.body.innerHTML;
    //var page = String(document.URL).substr(String(document.URL).indexOf('=')+1, 65);
    //var newhtml='Error...';
    //var whoami = GM_getValue("Koc_User");

    //ReturnRequest('E_CustomPage.php?page=' + page + '&u=' + whoami,1,function(r){
    //var newhtml = stuff.replace("Loading...",'');
    //var newhtml = newhtml.replace("Please wait...",r);
    //document.body.innerHTML = newhtml;
    //});
    //}

    function stats() {
        var stuff = document.body.innerHTML;
        var userid = String(document.URL).substr(String(document.URL).indexOf('=')+1).replace(/\&start=\d+/g, '');
        GM_setValue("Win_userID"+userid);
        //console.log(String(document.URL).substr(String(document.URL).indexOf('=')+1).replace(/\&start=\d+/g, ''));

        var newhtml = '';
        if (!IsNumeric(userid)) {
            /* newhtml = stuff.replace("Error",'Loading...');
        newhtml = newhtml.replace("Invalid User ID",'Please wait...');
        document.body.innerHTML = newhtml;
        CustomPage(); */
            if(userid == "accounts" || userid == "approve" || userid == "top10" || userid == "warlist"){
                AccessFunction();
            }
            else{
                newhtml = stuff.replace("Error",'Loading...');
                newhtml = newhtml.replace("Invalid User ID",'Please wait...');
                document.body.innerHTML = newhtml;
                CustomPage();

            }
        } else {
            if (InStr(stuff,"Invalid User ID") == true) {
                ReturnRequest('E_Active.php?id=' + userid + '&a=0',1,function(r){
                    newhtml = stuff.replace("Invalid User ID",'Invalid UserID (Vacation mode or deleted)<br>' + r);
                    document.body.innerHTML = newhtml;

                });
            } else {
                var maxed = false , user;
                if (InStr(stuff,"[MAXED]") == true){
                    maxed = true;
                }
                //console.log(maxed);
                //either gets the name if maxed or not, end result is just userName
                var userNotMaxed = trim(FindText(FindText(stuff,"<td><b>Name:</b></td>","</tr>"),"<td>","</td>"));
                var userMaxed = FindText(FindText(stuff,"<td><b>Name:</b></td>","</tr>"),"<td>","[MAXED]").replace(/\s+/g,'');
                //console.log("NOT: ",userNotMaxed);
                //console.log("MAXD: ",userMaxed);
                user = (maxed == true) ? userMaxed : userNotMaxed.replace(/\s+/g,'');
                //user = user.replace("'s",""); KoC-Moderator_bon <font color="#ffff00"> (Moderator)</font>
                //alert(user);
                //var trr = GetTag('td', user);
                //trr.outerHTML = '<td>'+user+'<div id="_fetchZone" style="float:right;">Fetching Zone..</div></td>';

                if(InStr(user,'<font color=') == true){
                    //Online <font color="RED"> (Game Owner)</font>
                    //user = FindText(user,">","<");
                    if(InStr(user,'<font color="#ffff00">') == true){
                        user = user.replace('<font color="#ffff00"> (Moderator)</font>',"");
                    }
                    if(InStr(user,'<font color="RED">') == true){
                        user = user.replace('<font color="RED"> (Game Owner)</font>',"");
                    }
                } else {
                    user = replaceAll(user,"\t","");
                    user = replaceAll(user,"\n","");
                }
                //alert(user);
                //console.log(user);

                UsersSize = FindText(FindText(stuff,"<td><b>Army Size:</b></td>","</tr>"),"<td>","</td>");
                UsersRank = FindText(FindText(stuff,"<td><b>Rank:</b></td>","</tr>"),"<td>","</td>");

                var Morale = FindText(FindText(stuff, 'Army Morale:','</tr>'),'<td>','</td>');

                //DO NOT DELETE THIS LINE MAY NEED SOMEDAYvar UserChain = FindText(FindText(stuff,"<td><b>Chain Name:</b></td>","</tr>"),"<td>","</td>");
                var UserChain = GetText(">Alliances:", "<b>", "alliances.php?id=", ">", "<");
                if(!UserChain){
                    var UserChain = "NONE";
                }
                //console.log(UserChain);
                var UsersRace = FindText(FindText(stuff,"<td><b>Race:</b></td>","</tr>"),"<td>","</td>");
                var UsersCommander = FindText(FindText(stuff,"<td><b>Commander:</b></td>","</tr>"),"<td>","</td>");
                UsersGold = "1337";
                if(InStr(stuff,"stats") == true){
                    UsersCommander = FindText(UsersCommander,">","<");
                }
                if(InStr(stuff,"Treasury:") == true){
                    UsersGold = FindText(FindText(stuff,"<td><b>Treasury:</b></td>","</tr>"),"<td>","</td>");
                    //alert(UsersGold);
                }



                var cID = getClassIndex('table_lines','User Stats');
                if(!String(cID).match('undefined')){
                    /*var getSel = document.getElementsByName("buddy_ype");
                var selOption = document.createElement("option");
                selOption.text = "slay";
                getSel.add(selOption);*/
                    /*var x = document.getElementsByTagName("select")[0];
                    //var x = document.getElementsByName("buddy_ype")[0];
                    if (x.selectedIndex >= 0) {
                        var option = document.createElement("option");
                        option.text = "Kiwi";
                        option.label = "Kiwi";
                        option.value = "Kiwi";
                        var sel = x.options[x.selectedIndex];
                        x.add(option, sel);
                    }*/
                    //alert(userid);
                    document.addEventListener('click', function(event) {
                        if(event.target.name == 'recon_request'){
                            var whoami = GM_getValue("Koc_User");
                            ReturnRequest('ReconRequest.php?user=' + user + '&id=' + userid + '&me=' + whoami,0,function(responseText){
                                ReturnRequest('ShowRequest.php',0,function(responseText){
                                    Ruser = FindText(responseText,'[/END]<br/>');
                                    var Ruser = responseText.split('[/END]<br/>');
                                    var cID = getClassIndex('table_lines','Officers');
                                    if(!String(cID).match('undefined')){
                                        var RRgetDivs = document.getElementsByTagName('div');
                                        for (var i=0; i<RRgetDivs.length; i++) {
                                            if (RRgetDivs[i].id =='RRdiv') {RRgetDivs[i].innerHTML=Ruser;i=RRgetDivs.length;break;}
                                        }
                                    }
                                });
                            });
                        }

                    },true);
                }

                ReturnRequest('ShowRequest.php',0,function(responseText){
                    Ruser = FindText(responseText,'[/END]<br/>');
                    var Ruser = responseText.split('[/END]<br/>');
                    var cID = getClassIndex('table_lines','Officers');
                    if(!String(cID).match('undefined')){
                        var RRDiv=document.createElement('div');
                        RRDiv.id = 'RRdiv';
                        RRDiv.style.backgroundColor='black';
                        RRDiv.style.color='white';
                        RRDiv.style.position='absolute';
                        RRDiv.style.top='10px';
                        RRDiv.style.right='10px';
                        RRDiv.innerHTML=Ruser;
                        document.body.appendChild(RRDiv);
                    }
                });
                if(!String(cID).match('undefined')){
                    document.addEventListener('click', function(event){
                        if(event.target.name == 'save_user_war'){
                            var whoami = GM_getValue("Koc_User");
                            ReturnRequest('E_AddMyWarlist.php?user=' + whoami + '&warname=' + user,0,function(response){
                                if(response.indexOf("done") != -1){
                                    alert("Added Successfully!");
                                    document.location.reload();
                                } else if(response.indexOf("error") != -1){
                                    alert("Was an error. Try again or have a talk with script developer.");
                                }
                            });
                        }
                    },true);
                }
                var mkOfficer = new Array();
                var fetchOffiTable = document.getElementsByClassName("table_lines officers")[0].innerHTML;
                var offiTable = fetchOffiTable.split('<td>');
                for(var i = 0; i < offiTable.length-1; i++) {
                    if (offiTable[i].indexOf('href=') != -1){
                        var offiId = FindText(offiTable[i],'stats.php?id=','">');
                        var offiName = FindText(offiTable[i],'">','</a></td>');
                        //console.log("ID: "+offiId+" = "+offiName);
                        mkOfficer[mkOfficer.length] = new Array(offiId,offiName);
                    }
                }
                //alert(fetchOffiTable);
                //soldiers * racebonus * 2 + spies/sentries *0.4 * racebonus * 2 + econ * racebonus
                //Total Fighting Force	11,088
                //racebonus 1
                //Spies	85
                //Sentries	80
                //ECON = Construction (11,700 gold per turn)
                //Projected Income	39,110 Gold (in 1 min)*/

                //var raceTBG = ((parseInt(11088) * parseFloat(1.15)) * parseInt(2)) + ((((parseInt(85) + parseInt(80)) * parseFloat(0.4)) * parseFloat(1.15)) * parseInt(2)) + (parseInt(11700) * parseFloat(1.15));
                //alert(raceTBG);

                ReturnRequest('E_DisplayStats.php?user=\n' + user + '&sid=' + userid + '&size=\n' + UsersSize + '&gold=\n' + UsersGold + '&rank=\n' + UsersRank + '&com=' + UsersCommander + '&race=' + UsersRace + "&c=" + UserChain + '&morale=' + Morale + '&guser=' + GM_getValue("Koc_User"),0,function(responseText){

                    //showTimeZone = FindText(responseText,"[SHOWZONES]","[/SHOWZONES]");
                    //Zones = FindText(responseText,"[ZONES]","[/ZONES]");
                    hOver = addCommas(FindText(responseText,"[hover]","[/hover]"));
                    avghit = addCommas(FindText(responseText,"[AVGHIT]","[/AVGHIT]"));
                    lastHit = addCommas(FindText(responseText,"[LASTHIT]","[/LASTHIT]"));
                    avghit = (isNaN(rmCommas(avghit))) ? 0 : addCommas(FindText(responseText,"[AVGHIT]","[/AVGHIT]"));
                    lastHit = (isNaN(rmCommas(lastHit))) ? 0 : addCommas(FindText(responseText,"[LASTHIT]","[/LASTHIT]"));
                    TheSA = addCommas(FindText(responseText,"[SA]","[/SA]"));
                    TheDA = addCommas(FindText(responseText,"[DA]","[/DA]"));
                    TheSpy = addCommas(FindText(responseText,"[Spy]","[/Spy]"));
                    TheSentry = addCommas(FindText(responseText,"[Sentry]","[/Sentry]"));
                    TheSATime = FindText(responseText,"[SATime]","[/SATime]");
                    TheDATime = FindText(responseText,"[DATime]","[/DATime]");
                    TheSpyTime = FindText(responseText,"[SpyTime]","[/SpyTime]");
                    TheSentryTime = FindText(responseText,"[SentryTime]","[/SentryTime]");
                    TheAge = FindText(responseText,"[Age]","[/Age]");
                    TheChain = FindText(responseText,"[Chain]","[/Chain]");
                    sGold = FindText(responseText,"[gold]","[/gold]");
                    uTag = FindText(responseText,"[tag]","[/tag]");
                    sTBG = FindText(responseText,"[tbg]","[/tbg]");
                    sTBG30 = FindText(responseText,"[tbg30]","[/tbg30]");
                    getRaidcount = FindText(responseText,"[Countraid]","[/Countraid]");
                    GM_setValue('getRaidcount',getRaidcount);
                    //alert(TheChain);

                    var cBut2 = GetElement('input', "Raid Now!");
                    cBut2.value = cBut2.value.replace("Raid Now!", "Raid Now! ("+getRaidcount+")");

                    var statsHeader = GetTag('th', "Recent Recon Mission Logs | Last Updated");
                    var tableNames = '<tr><td class="subh"><strong>Stat Name</strong></td><td class="subh" align="right"><strong>KOCStat</strong></td><td class="subh" style="color: red;"><strong>SALT Stat</strong></td><td class="subh" style="color: red;"><strong>Time</strong></td></tr>';
                    var tableRows = '<tr style="background-color:#424949;"><td style="background-color:#424949;"><b>Avg Hit: </b></td><td align="right">'+avghit+'</td><td align="left" style="background-color:#424949;"><b>Last Hit: </b></td><td>'+lastHit+'</td></tr>';
                    statsHeader.parentNode.parentNode.insertRow(1).innerHTML = tableNames;
                    statsHeader.parentNode.parentNode.insertRow(6).innerHTML = tableRows;

                    var statTable = getClassIndex('table_lines','Recent Recon Mission Logs | Last Updated');
                    if(!String(statTable).match('undefined')){
                        var wBrows = document.getElementsByClassName('table_lines')[statTable].getElementsByTagName('tr');
                        wBrows[0].cells[0].setAttribute('colspan','4');
                        wBrows[2].insertCell(2).outerHTML = "<td align='left'>"+TheSA+"</td>";
                        wBrows[2].insertCell(3).outerHTML = "<td align='left'>"+TheSATime+"</td>";
                        wBrows[3].insertCell(2).outerHTML = "<td align='left'>"+TheDA+"</td>";
                        wBrows[3].insertCell(3).outerHTML = "<td align='left'>"+TheDATime+"</td>";
                        wBrows[4].insertCell(2).outerHTML = "<td align='left'>"+TheSpy+"</td>";
                        wBrows[4].insertCell(3).outerHTML = "<td align='left'>"+TheSpyTime+"</td>";
                        wBrows[5].insertCell(2).outerHTML = "<td align='left'>"+TheSentry+"</td>";
                        wBrows[5].insertCell(3).outerHTML = "<td align='left'>"+TheSentryTime+"</td>";
                    }

                    /*var table = '<table class="table_lines" align="center" width="120%" cellspacing="0" cellpadding="6" border="0">'+
                    '<tr><th colspan="5">Recent Stats | Estimated SOV = ' + FindText(responseText,"<sov=","></sov>") + ' <div id=showhistory>(History)</div></th></tr>'+
                    '<tr><td><b>Strike Action</b></td><td colspan="2" align="center">' + TheSA + '&nbsp;</td><td>' + TheSATime + '</td></tr>'+
                    '<tr><td><b>Defensive Action</b></td><td colspan="2" align="center">' + TheDA + '&nbsp;</td><td>' + TheDATime + '</td></tr>'+
                    '<tr><td><b>Spy Rating</b></td><td colspan="2" align="center">' + TheSpy + '&nbsp;</td><td>' + TheSpyTime + '</td></tr>'+
                    '<tr><td style="border:0;"><b>Sentry Rating</b></td><td colspan="2" align="center" style="border:0;">' + TheSentry + '&nbsp;</td><td>' + TheSentryTime + '</td></tr>';
                */

                    /* var cID = getClassIndex('table_lines','Officers');
                var user = FindText(FindText(stuff,"<td><b>Name:</b></td>","</tr>"),"<td>","</td>");
                ReturnRequest('DisplayOldStats.php?name=\n' + user,0,function(responseText){
                    document.addEventListener('click', function(event){
                        if(event.target.id == 'showhistory'){
                            addCSS('table.histtable {table-layout:fixed;width:100%;height:75%;border-collapse:collapse;border:3px white;border-collapse:separate;border-spacing:5px;}');
                            DisplayHistory(responseText);
                        }
                    });
                });*/
                    /*if(!String(cID).match('undefined')){
                    document.getElementsByClassName('table_lines')[cID].innerHTML = table + document.getElementsByClassName('table_lines')[cID].innerHTML; //"Lol";
                }*/
                    // -- Display info
                    DisplayMessage2('<strong>'+hOver+'</strong>');
                });
                AppendStatsTable(UsersGold);
                SetChain();
                expcolTable('Officers');
                expcolTable('Recent Intelligence');
                expcolTable('Recent Battles');

                var cBut1 = GetElement('input', "Attack Now!");
                cBut1.value = cBut1.value.replace("Attack Now!", "Attack Now!");
                var cBut3 = GetElement('input', "Sabotage!");
                cBut3.value = cBut3.value.replace("Sabotage!", "Sabotage!");
                var cBut4 = GetElement('input', "Recon Now!");
                cBut4.value = cBut4.value.replace("Recon Now!", "Recon Now!");
                var cBut5 = GetElement('input', "Send Message");
                cBut5.value = cBut5.value.replace("Send Message", "Send Message");
            }
        }
        var whoami = GM_getValue("Koc_User");
        var noteDiv = document.createElement('div');
        var noteArea = document.createElement('textarea');
        var noteButton = document.createElement('input');
        noteDiv.style.position = 'absolute';
        noteDiv.style.top = '0px';
        noteDiv.style.left = '0px';
        noteDiv.style.color = 'white';
        noteDiv.style.borderRadius='15px';
        noteArea.style.width = '100%';
        noteArea.style.backgroundColor = 'black';
        noteArea.style.borderRadius='15px';
        noteArea.id = 'notetoself';
        // noteArea.innerHTML = 'Timezone wtf i dont care'+"\r\n"+'and yes this is it and'+"\r\n"+'popopopopo';
        noteButton.type = 'button';
        noteButton.value='Update!';
        noteButton.id='notetoselfsave';
        noteButton.style.borderRadius='15px';
        var notething1 = document.body.appendChild(noteDiv);
        notething1.appendChild(noteArea);
        var notebutt = notething1.appendChild(noteButton);
        notebutt.addEventListener('click',function () {ReturnRequest('E_statsNotes.php?u='+whoami+'&uid='+userid+'&note='+encodeURI(document.getElementById('notetoself').value),0,function(responseText){
            if (responseText == 'SPAM'){alert("Please don't spam that much.");	}
            else { alert('Saved!'); }
        });});
        ReturnRequest('E_statsNotes.php?u='+whoami+'&uid='+userid+'&fetch=1',0,function(responseText){
            document.getElementById('notetoself').innerHTML = responseText;
        });
    }
    function SetChain(){
        if (TheChain == 'NULL'){
            setTimeout(SetChain, 1500);
        } else {
            if(document.getElementById('_sgold') != null){
                document.getElementById('_sgold').innerHTML = sGold;
            }
            //document.getElementById('_fetchZone').innerHTML = showTimeZone;
            document.getElementById('_chain').innerHTML = TheChain;
            //document.getElementById('_tzone').innerHTML = Zones;
            document.getElementById('_stbg').innerHTML = sTBG;
            document.getElementById('_stbg30').innerHTML = sTBG30;
        }
    }
    function setWarlist() {
        var Xpos = 10;var Ypos = 10;
        if (GM_getValue("weaponsPrefsX",-1) != -1) Xpos = GM_getValue("weaponsPrefsX",10);
        if (GM_getValue("weaponsPrefsY",-1) != -1) Ypos = GM_getValue("weaponsPrefsY",10);
        makediv('weaponsPrefs',999,0,0,Xpos,Ypos,'#272727','Buy preferences');
        var newHTML = '<table border="0" cellspacing="4" cellpadding="0">';
        newHTML +='<tr>';
        newHTML +='<td valign="top" style="border-width:1px;border-color:black #cacaca #cacaca black;border-style:solid;">';

        newHTML += '<table border="0" cellpadding="2" cellspacing="2">';
        newHTML += '<tr>';
        newHTML += '<th colspan="2">Weapons</th>';
        newHTML += '</tr>';
        newHTML +='<tr>';
        newHTML +='<td></td>';
        newHTML +='</tr>';
        document.getElementById("content_weaponsPrefs").innerHTML = newHTML;
    }
    function AppendStatsTable(){
        var nameRE = /\<th colspan="2"\>User Stats\<\/th\>/ig;
        var q = document.getElementsByTagName('table');
        var statstable;
        var i;
        for(i = 0; i < q.length; i++){
            if(q[i].innerHTML.match(nameRE) && !q[i].innerHTML.match(/\<table/)){
                statstable = q[i];
                //break;
            }
        }
        /*var allianceindex;
        for (i = 0; i < statstable.rows.length; i++) {
            alert(statstable.rows[i].cells[0].innerHTML.indexOf('Alliances'));
            if (statstable.rows[i].cells[0].innerHTML.indexOf('Alliances') > 0) {
                allianceindex = i;
                //break;
            }
        }*/
        //statstable.rows[allianceindex].cells[1].innerHTML = '<div id="_alliances">' + statstable.rows[allianceindex].cells[1].innerHTML + '</div><a href="javascript:ShowAlliances();"> + Show</a>';

        statstable.insertRow(9).innerHTML = '<td><b>Chain: <b></td><td><div id="_chain">Fetching Data...</div></td>';

        //statstable.insertRow(16).innerHTML = '<td><b>Select Timezone: <b></td><td colspan="2">'+
        //'<div style="float:left;text-align:left;" id="_tzone"></div>'+
        //'<div style="float:right;text-align:right;"><input type="button" id="optionsSave" name="optionsSave" value="Change Timezone" /></div></td>';

        /*document.getElementById("optionsSave").addEventListener('click',function(e) {
            var Zoney = document.getElementById("selZone").value;
            ReturnRequest('E_Submittime.php?User='+GM_getValue("Koc_User")+'&uID='+GM_getValue("Win_userID")+'&zone='+Zoney,0,function(response){
                if(response.indexOf("DONE!") != -1){
                    document.location.reload();
                } else if(response.indexOf("WEAK!") != -1){
                    alert("Try getting a promotion. Your powers are weak.");
                } else if(response.indexOf("ERROR!") != -1){
                    alert("Your doing something wrong.");
                } else if(response.indexOf("ERROR2!") != -1){
                    alert("An error occured. Please contact the script developer.");
                } else{
                    alert("An error occured. Please contact the script developer");
                }
            });
            //window.location.replace("https://kingsofchaos.com/stats.php?id="+GM_getValue("Win_userID")+"");
            e.stopPropagation();
            e.preventDefault();
        },false);*/
        //alert(UsersGold);
        if(UsersGold == 1337){ //User can see gold, No need to show old gold.....
            statstable.insertRow(10).innerHTML = '<tr><td><b><span style="color:red">Last Gold: </span><b></td><td><div id="_sgold" style="color:red;">???</div></td></tr>';
        }
        //statstable.remove(14);
        //statstable.insertRow(3).innerHTML = '<tr><td><b>Treasury: <b></td><td>???</td></tr>';


        /*if (GM_getValue("RL_SALThide5",0) == 0) {
            statstable.insertRow(11).innerHTML = '<td><b>Recon Request: <b></td><td><div id="recon_request"><button name="recon_request"><font color=22AA22>Request...</font></button></div></td>';
        }*/
        if (GM_getValue("RL_SALThide4",0) == 0) {
            if (document.getElementsByName('to')[0]){
                var userid = String(document.URL).substr(String(document.URL).indexOf('=')+1);
                document.getElementsByName('to')[0].parentNode.parentNode.innerHTML = '<table width="100%"><tr><td><button style="width:100%" name="save_user_war">Add My Warlist!</button></td></tr><tr><td><form action="writemail.php" method="get"><input name="to" value="'+userid+'" type="hidden"><input style="width: 100%" value="Send Message" type="submit"></form></td></tr></table>';
                //<input style="width:100%" value="Send Mesage" type="submit"></form>';
            }
        }
        // Erebus recon request
        statstable.insertRow(12).innerHTML = '<tr><td><b><font color=yellow>Approx TBG(60min): </font><b></td><td><div id="_stbg" style="color:yellow;">???</div></td></tr>';
        statstable.insertRow(13).innerHTML = '<tr><td><b><font color=22AA22>Approx TBG(30min): </font><b></td><td><div id="_stbg30" style="color:green;">???</div></td></tr>';
        //Recon request action button
        addCSS('#_alliances{display:none;visibility:hidden;}');
        addJS('function ShowAlliances(){var q = document.getElementById(\'_alliances\');q.style.display = \'block\';q.style.visibility = \'visible\';q.nextSibling.href = \'javascript:HideAlliances();\';q.nextSibling.innerHTML = \' - Hide\'}',
              'function HideAlliances(){var q = document.getElementById(\'_alliances\');q.style.display = \'none\';q.style.visibility = \'hidden\';q.nextSibling.href = \'javascript:ShowAlliances();\';q.nextSibling.innerHTML = \' + Show\'}');
    }
    //hackman
    function RebuildArmoryArray(NewArmString,NumsWeap,OldArmString) {
        var FinalWeapArray=new Array();
        if (OldArmString != '') {
            var OldSplitArray1=OldArmString.split('|');
            for (var i=0; i<=OldSplitArray1.length-1; i++) {
                var OldSplitArray2=OldSplitArray1[i].split(':');
                FinalWeapArray[OldSplitArray2[0]]=OldSplitArray2[1];
            }
        }
        var NewSplitArray1=NewArmString.split('|');
        for (var i=0; i<=NewSplitArray1.length-1; i++) {
            var NewSplitArray2=NewSplitArray1[i].split(':');
            if ((NewSplitArray2[0] !== undefined) && (NewSplitArray2[0] != '')) {
                if ((FinalWeapArray[NewSplitArray2[0]] !== undefined) && (NewSplitArray2[1] != '???')) {
                    FinalWeapArray[NewSplitArray2[0]]=NewSplitArray2[1];
                }
                else if (FinalWeapArray[NewSplitArray2[0]] === undefined) {
                    FinalWeapArray[NewSplitArray2[0]]=NewSplitArray2[1];
                }
            }
        }
        var i=0;
        var FinalWeapString='';
        for (i in FinalWeapArray) {
            if (FinalWeapString != '') {
                FinalWeapString+='|'+i+':'+FinalWeapArray[i];
            }
            else {
                FinalWeapString=i+':'+FinalWeapArray[i];
            }
        }
        GM_setValue('AdvancedWeapsArr',FinalWeapString);
        if (NumsWeap == 0) {
            return true;
        }
        else {
            var TheWeapArrayStr=GM_getValue('AdvancedWeapsArr','');
            var TheWeapArray=TheWeapArrayStr.split('|');
            if (NumsWeap > TheWeapArray.length) {
                return false;
            }
            else {
                if (TheWeapArrayStr.match(/\?\?\?/)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    }
    //hackman
    function trim(str, chars) {
        return ltrim(rtrim(str, chars), chars);
    }
    function ltrim(str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
    }
    function rtrim(str, chars) {
        chars = chars || "\\s";
        return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    }
    function recon(){
        //var stuff = document.body.innerHTML;
        var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
        if (InStr(page,"Your Chief of Intelligence provides you with the information gathered") == true){
            var ReportID = String(document.URL).substr(String(document.URL).indexOf('=')+1, 8);
            var Username = FindText(FindText(page,"Under the cover of night, your spy sneaks into "," camp."),">","</font>");
            Username = Username.replace("'s","");

            var Strike = FindText(FindText(page,"Strike Action</font></td>","</tr>"),"color=\"#FFFF00\">","</font");//<font size="2" color="#FFFF00">Strike Action</font>
            var Defence = FindText(FindText(page,"Defensive Action</font></td>","</tr>"),"color=\"#FFFF00\">","</font");
            var TheSpy = FindText(FindText(page,"Spy Rating</font></td>","</tr>"),"color=\"#FFFF00\">","</font");
            var TheSentry = FindText(FindText(page,"Sentry Rating</font></td>","</tr>"),"color=\"#FFFF00\">","</font");
            var CovSkill = FindText(FindText(page,"<td>Covert Skill:</td>","</tr>"),">","</");
            var Spies = rmCommas(FindText(FindText(page,"<td>Spies:</td>","</tr>"),">","</"));
            var Sentries = rmCommas(FindText(FindText(page,"<td>Sentries:</td>","</tr>"),">","</"));
            var Siege = FindText(FindText(page,"<td>Siege Technology:</td>","</tr>"),">","</");
            var Unit = FindText(FindText(page,"<td>Unit Production:</td>","</tr>"),">","</");//How many per 24 hours
            var XP = rmCommas(FindText(FindText(page,"<td>Experience:</td>","</tr>"),">","</"));
            var Econ = FindText(FindText(page,"<td>Economy:</td>","</tr>"),">","</");
            var Tech = FindText(FindText(page,"<td>Technology:</td>","</tr>"),">","<");
            var UsersGold = rmCommas(FindText(FindText(page,"Treasury","Gold"),'color="#00FFFF">'," "));//<font size="3" color="GOLDENROD">817,942 Gold</font>
            var SafeGold = FindText(FindText(page,'<font size="2" color="GOLDENROD">Safe</font>',"Gold"),'color="GOLDENROD"> '," ");
            var StatsID = FindText(page,'"id" value="','"');
            var UserTurns = FindText(FindText(page,"<td>Attack Turns:</td>","</tr>"),">","</");

            //alert(SafeGold);
            if( Username != GM_getValue("failspy_user") ){
                GM_setValue("failspy_user",Username);
                GM_setValue("last_SA",'???');
                GM_setValue("last_DA",'???');
                GM_setValue("last_Spy",'???');
                GM_setValue("last_Sentry",'???');
                GM_setValue("last_Gold",'???');
                //weap
                GM_setValue("last_BPM",'BPM: ???');
                GM_setValue("last_IS",'IS: ???');
                GM_setValue("last_NUN",'NUN: ???');
                GM_setValue("last_LT",'LT: ???');
                GM_setValue("last_CH",'CH: ???');
                GM_setValue("last_DS",'DS: ???');
            }
            GM_setValue("last_Gold", '<b>GOLD ' + UsersGold + '</b>');

            if(CheckStat(Strike) == true) { GM_setValue("last_SA", Strike); }
            if(CheckStat(Defence) == true) { GM_setValue("last_DA", Defence); }
            if(CheckStat(TheSpy) == true) { GM_setValue("last_Spy", TheSpy); }
            if(CheckStat(TheSentry) == true) { GM_setValue("last_Sentry", TheSentry); }

            const trRE=/\<tr\>/ig;

            var usetgold,usetgold_temp;

            usetgold = "[user]" + Username + "[/user]start";

            //usetgold_temp = gm_setValue('UserReconSave'+usetgold);
            var usetgold2 = '';
            //$('html > body > table > tbody > tr > td > table > tbody > tr > th').remove();

            var WeaponTable = FindText(page,'<tr><th colspan="4">Weapons</th></tr>','</tbody></table>');//<form method="get" action="attack.php">
            var nowInArmory = WeaponTable.length-1;
            var wRow = WeaponTable.split('<tr>');
            var iRow;
            var inArmory = 0;

            for (iRow=2;iRow<wRow.length;iRow++) {
                if(InStr(wRow[iRow],'td align="right">') == true){
                    var inArmory = wRow.length-2;
                    var cWeap = wRow[iRow].split('align="right">');
                    //alert(inArmory);
                    var wtype,qu,st;

                    wtype = FindText(cWeap[1],'','</td>');
                    qu = FindText(cWeap[2],'','</td>').replace(/,/g,'');
                    st = FindText(cWeap[3],'','</td>').replace(/,/g,'');

                    //alert(wtype);
                    var tempz = st.split('/');
                    var num = tempz[0];
                    var den = tempz[1];
                    var weap = FindText(wRow[iRow],"<td>","</td>");
                    console.log('tempz: '+tempz+',num: '+num+', den: '+den+', weap: '+weap);

                    if (qu != "???") {
                        if((weap != "???") || (weap != "???" && wtype != "???") || (weap != "???" && den != "???") || (wtype != "???" && den != "???") || (weap != "???" && den != "???" && wtype != "???")) {
                            if (weap == "???") {
                                switch(wtype) {
                                    case "Attack":
                                        if (den == "600") {
                                            weap = "chariot";
                                        } else if (den == "1,000") {
                                            weap = "Blackpowder Missile";
                                        }
                                        break;
                                    case "Defense":
                                        if (den == "256") {
                                            weap = "Dragonskin";
                                        } else if (den == "1,000") {
                                            weap = "Invisibility Shield";
                                        }
                                        break;
                                    case "Spy":
                                        if (den == "1,000") {
                                            weap = "Nunchaku";
                                        }
                                        break;
                                    case "Sentry":
                                        if (den == "1,000") {
                                            weap = "Lookout Tower";
                                        }
                                        break;
                                }
                                //alert("test1");
                            }

                        }
                    }
                    if (usetgold2 != '') {
                        usetgold2 += '|'+ weap + ':' + qu;
                    }
                    else {
                        usetgold2 = weap + ':' + qu+'|';
                    }
                    usetgold = usetgold + "[weap]--w=" + weap + "--q=" + qu + " + --s=" + st + "--x[/weap]";
                    if((WeaponFromStrength(st) == 'IS') || (WeaponFromName(weap) == 'IS')){
                        //if(InStr(st,'??') == false) { strengthIS = st; }
                        sIS = "IS: " + qu + ' (' + strengthIS + ' )';
                        GM_setValue("last_IS",sIS);
                    } else if((WeaponFromStrength(st) == 'NUN') || (WeaponFromName(weap) == 'NUN')){
                        sNUN = "NUN: " + qu;
                        GM_setValue("last_NUN",sNUN);
                    } else if((WeaponFromStrength(st) == 'BPM') || (WeaponFromName(weap) == 'BPM')){
                        //if(InStr(st,'??') == false) { strengthBPM = st; }
                        sBPM = "BPM: " + qu + ' (' + strengthBPM + ' )';
                        GM_setValue("last_BPM",sBPM);
                    } else if((WeaponFromStrength(st) == 'LT') || (WeaponFromName(weap) == 'LT')){
                        sLT = "LT: " + qu;
                        GM_setValue("last_LT",sLT);
                    } else if((WeaponFromStrength(st) == 'LT') || (WeaponFromName(weap) == 'Skins')){
                        sDS = "Skins: " + qu;
                        GM_setValue("last_DS",sDS);
                    } else if((WeaponFromStrength(st) == 'LT') || (WeaponFromName(weap) == 'Chariots')){
                        sCH = "Chariots: " + qu;
                        GM_setValue("last_CH",sCH);
                    }
                }
            }
            var whoami = GM_getValue("Koc_User");
            usetgold = usetgold+"end";
            //console.log(usetgold);


            ReturnRequest('E_Recon.php?user='+Username+'&sa='+Strike+'&da='+Defence+'&spy='+TheSpy+'&sentry='+TheSentry+'&statsid='+StatsID+'&gold='+UsersGold+'&turns='+UserTurns+'&spies='+Spies+'&sentries='+Sentries+'&u='+whoami+'&rid='+ReportID+'&covertSK='+CovSkill+'&siege='+Siege+'&unit='+Unit+'&xp='+XP+'&econ='+Econ+'&tech='+Tech,1, function(responseText){
                //console.log('php?user='+Username+'&sa='+Strike+'&da='+Defence+'&spy='+TheSpy+'&sentry='+TheSentry+'&statsid='+StatsID+'&gold='+UsersGold+'&turns='+UserTurns+'&spies='+Spies+'&sentries='+Sentries+'&u='+whoami+'&rid='+ReportID+'&covertSK='+CovSkill+'&siege='+Siege+'&unit='+Unit+'&xp='+XP+'&econ='+Econ+'&tech='+Tech);
                var setRid = ReportID;
                var setMe = GM_getValue("setRid");
                //alert("test6");
                var result;
                var color;
                if(ReportID != setMe) {
                    result = "Recon Logged Successfully";
                    color = "green";
                } else if(ReportID == setMe) {
                    result = "This recon already exists.";
                    color = "yellow";
                } else if(ReportID == ''){
                    result = "Error Occoured.";
                    color = "red";
                }
                /*$(document).ready(function(){
                    $("td").find("font").contents().unwrap();
                });*/
                /*var remFont = document.getElementsByTagName('font').innerHTML;
            while(remFont.length) {
                var parent = remFont[0].parentNode;
                while( remFont[0].firstChild ) {
                    parent.insertBefore( remFont[0].firstChild, remFont[0]);
                }
                parent.removeChild(remFont[0]);
            }*/

                /*var table = getTableByHeader('<th>Treasury</th>');
                var myTable = document.getElementsByTagName("table")[14];
                var myClone = myTable.cloneNode(true);
                document.body.appendChild(myClone,table);*/

                var source = document.getElementsByTagName("table")[14];
                var destination = document.getElementsByTagName("table")[12];//12
                var copy = source.cloneNode(true);
                copy.setAttribute('id', 'tableB');
                copy.setAttribute('colspan', '4');
                destination.parentNode.appendChild(copy, destination);//replaceChild

                /*table.setAttribute('colspan','4');
                var row1 = document.createElement("tr");
                var row2 = document.createElement("tr");
                row1.innerHTML = "<tr><td align=\"center\" style=\"color: "+ color + "\">"+result+"</td></tr>";
                row2.innerHTML = '<table class="buttons" cellpadding="6" border="0" cellspacing="0" width="100%">'+
                    '<tbody><tr><td width="50%" align="center"><form method="post" action="attack.php" name="attack">'+
                    '<input name="defender_id" value="'+StatsID+'" type="hidden">'+
                    '<input name="attack_type" value="attack" type="hidden">'+
                    '<input name="attackbut" onclick="this.value=\'Attacking..\'; this.attackbut.disabled=true; this.submit();" value="Attack Now!" type="submit">'+
                    '<input name="turing" value="ehbr" type="hidden">'+
                    '</form>'+//</td>'+//
                    '<form action="attack.php" method="post" name="attack">'+
                    '<input name="defender_id" value="'+StatsID+'" type="hidden">'+
                    '<input name="attack_type" value="raid" type="hidden">'+
                    '<input name="attackbut" onclick="this.attackbut.value=\'Raiding..\'; this.attackbut.disabled=true; this.submit();" value="Raid Now!" type="submit">'+
                    '<input name="turing" value="ehbr" type="hidden">'+
                    '</form>'+//</td>'+
                    '<form action="attack.php#sab" method="get">'+
                    '<input name="id" value="'+StatsID+'" type="hidden">'+
                    '<input name="spybut" value="Sab Now!" type="submit">'+
                    '</form>'+//</td>'+ //'<input style="width: 100%" value="Sabotage!" type="submit">'+
                    '<form action="attack.php" method="post" name="spyr">'+//<td align=\"center\" width=\"25%\">
                    '<input name="mission_type" value="recon" type="hidden">'+
                    '<input name="defender_id" value="'+StatsID+'" type="hidden">'+
                    '<input name="spyrbut" onclick="this.spyrbut.value=\'Spying..\'; this.spyrbut.disabled=true; this.submit();" value="Recon Now!" type="submit">'+
                    '<input name="turing" value="ehbr" type="hidden">'+
                    '</form></td></tr></tbody></table>';*/

                //row2.innerHTML = "<td align=\"center\">"+result+"</td></tr>";
                //table.rows[2].insertBefore(row1,table.rows[2]);
                //table.rows[3].insertBefore(row2,table.rows[3]);
                //table.rows[1].cells[0].style.textAlign = "center";
                //table.rows[3].cells[0].style.textAlign = "center";

                GM_setValue("setRid", setRid);
            });
            ReturnRequest('E_AATRecon.php?list=\n' + usetgold,1, function(responseText){
                console.log('RESPONSE: ',responseText);
                var t;
                var DB_Name = '';
                var DB_Weap = [];
                var DB_Qty = [];
                var DB_Str = [];
                var uset_emporary = usetgold.split('[/weap]');
                console.log('SPLIT: ',uset_emporary);
                for(t=0;t<uset_emporary.length;t++){
                    uset_emporary[t] = trim(uset_emporary[t]);
                    if(uset_emporary[t] != ''){
                        DB_Name = FindText(uset_emporary[0],'[user]','[/user]');
                        DB_Weap = FindText(uset_emporary[t],'[weap]--w=','--q');
                        DB_Qty = FindText(uset_emporary[t],'--q=','+');
                        DB_Str = FindText(uset_emporary[t],'--s=','--x');
                    }

                    //DB_Name = uset_emporary ; "[user]bladest0rm[/user]start[weap]--w=Horn--q=1 + --s=75/75--x"
                    //DB_Weap; "[weap]--w=???--q=1906 + --s=40/40--x"
                    //DB_Qty; ''
                    //DB_Str; ''
                    console.log('AFTER-SPLIT: ',DB_Name);
                }
                //GM_log(responseText);
                //GM_log(responseText);

                //hackman
                var lstreconnedusr = GM_getValue('lastReconed','');
                if (lstreconnedusr != Username) {
                    GM_setValue('lastReconed',Username);
                    GM_setValue('AdvancedWeapsArr','');
                }
                var advReconarmory=GM_getValue('AdvancedWeapsArr','');
                if ((usetgold2 != '') || (wRow.length == 0)) {
                    if (RebuildArmoryArray(usetgold2,wRow.length,advReconarmory)) {
                        var finalFullArmory = GM_getValue('AdvancedWeapsArr','');
                        if (wRow.length == 0) {
                            var fullArmPost = 'list=[user]'+Username+'[/user]startend&full=yes';
                        }
                        else {
                            var fullArmPost = 'list=[user]'+Username+'[/user]start[weap]--w='+finalFullArmory.replace(/\|/g,'--x[/weap][weap]--w=').replace(/:/g,'--q=')+'--x[/weap]end&full=yes';
                        }
                        GM_log(fullArmPost);
                        DisplayMessage2('<strong style="color:green">Armory\'s weapons FULLY reconned!</strong>')
                        ReturnRequest('GM_AATRecon.php?'+fullArmPost,1,function(responseText){
                            DisplayMessage2('<strong style="color:green">Armory\'s weapons FULLY reconned!</strong>');
                            GM_log(responseText);
                        });
                        //reset the state of "fully reconned" to avoid next recon on same target to send the full armory again & again
                        GM_setValue('lastReconed','');
                    }
                    else {
                        DisplayMessage2('<strong>Armory\'s weapons NOT Fully reconned yet.</strong>')
                    }
                }
                else {
                    DisplayMessage2('<strong>Armory\'s weapons NOT Fully reconned yet.</strong>')
                }
                //hackman

                //alert('GM_AATRecon.php?list=\n' + usetgold, function(responseText){
                // GM_log(responseText);
                /* DisplayMessage2(responseText);
		var result;
		var color;
        if(responseText("Updated Player")) {
            result = "Recon Logged Successfully";
            color = "yellow";
        } else if(responseText("This report exists")) {
          result = "This recon already exists.";
          color = "red";
        } else {
          result = "Error Occoured.";
          color = "red";
        }
		UsersGold.insertRow(2).insertCell(0).innerHTML = "<span style=\"color: "+ color + "\">" + result + "</span>";
        UsersGold.rows[2].cells[0].style.textAlign = "center"; */

            });

            if(GM_getValue("spy") == 1){

            }
        }else{

        }
    }
    function getNav() {

        //var navtop=document.createElement('tr');
        //var navtop;//navtop.className='nav';
        //var navtop = document.getElementsByClassName('nav')[0].innerHTML;
        //var navparent=document.getElementsByClassName('nav')[0].parentNode;
        //navparent.insertBefore(navtop,navparent.getElementsByTagName('tr')[1]);
        var navbar = document.getElementsByClassName('nav')[1];
        var allnavtds = navbar.getElementsByTagName('td');
        var navPrev = allnavtds[0].getElementsByTagName('a')[0];
        if (typeof navPrev !== 'undefined') {
            navPrev.setAttribute('mommy',navPrev.href);
            navPrev.setAttribute('style','cursor:pointer;');
            navPrev.removeAttribute('href');
            navPrev.addEventListener('click', function(e){ GetRequest(e.target.getAttribute('mommy'),function(response) {
                var tmpdiv = document.createElement('div');
                tmpdiv.innerHTML = response;
                //alert(tmpdiv);
                objClass(document,'table_lines battlefield', 'table',0).innerHTML=objClass(tmpdiv,'table_lines battlefield', 'table',0).innerHTML;
                getNav();
                window.eval('battlefield_players();'); //re-trigger the native function to make the navbar ajax.
                battlefield2();
            });}, true);
        }

        var navNext = allnavtds[2].getElementsByTagName('a')[0];
        if (typeof navNext !== 'undefined') {
            //wever = mommy;
            navNext.setAttribute('mommy',navNext.href);
            navNext.setAttribute('style','cursor:pointer;');
            navNext.removeAttribute('href');
            navNext.addEventListener('click', function(e){ GetRequest(e.target.getAttribute('mommy'),function(response) {
                var tmpdiv = document.createElement('div');
                tmpdiv.innerHTML = response;
                //alert(tmpdiv);
                objClass(document,'table_lines battlefield', 'table',0).innerHTML=objClass(tmpdiv,'table_lines battlefield', 'table',0).innerHTML;
                getNav();
                window.eval('battlefield_players();'); //re-trigger the native function to make the navbar ajax.
                battlefield2();
            });}, true);
        }
        navbar = document.getElementsByClassName('nav')[0];
        allnavtds = navbar.getElementsByTagName('td');
        navPrev = allnavtds[0].getElementsByTagName('a')[0];
        if (typeof navPrev !== 'undefined') {
            navPrev.setAttribute('mommy',navPrev.href);
            navPrev.setAttribute('style','cursor:pointer;');
            navPrev.removeAttribute('href');
            navPrev.addEventListener('click', function(e){ GetRequest(e.target.getAttribute('mommy'),function(response) {
                var tmpdiv = document.createElement('div');
                tmpdiv.innerHTML = response;
                //alert(tmpdiv);
                objClass(document,'table_lines battlefield', 'table',0).innerHTML=objClass(tmpdiv,'table_lines battlefield', 'table',0).innerHTML;
                getNav();
                window.eval('battlefield_players();'); //re-trigger the native function to make the navbar ajax.
                battlefield2();
            });}, true);
        }

        var navNext = allnavtds[2].getElementsByTagName('a')[0];
        if (typeof navNext !== 'undefined') {
            navNext.setAttribute('mommy',navNext.href);
            navNext.setAttribute('style','cursor:pointer;');
            navNext.removeAttribute('href');
            navNext.addEventListener('click', function(e){ GetRequest(e.target.getAttribute('mommy'),function(response) {
                var tmpdiv = document.createElement('div');
                tmpdiv.innerHTML = response;
                //alert(tmpdiv);
                objClass(document,'table_lines battlefield', 'table',0).innerHTML=objClass(tmpdiv,'table_lines battlefield', 'table',0).innerHTML;
                getNav();
                window.eval('battlefield_players();'); //re-trigger the native function to make the navbar ajax.
                battlefield2();
            });}, true);
        }
    }

    function battlefieldUser(){
        document.addEventListener('mouseover', function(event)
                                  {
            if(InStr(event.target,"stats.php?") == true){
                //setAttribute('style', 'opacity:0.4;border-radius: 150px;-webkit-border-radius: 150px;-moz-border-radius: 150px;');
                var userid = String(event.target).substr(String(event.target).indexOf('=')+1, 7);
                bfStats(userid);
            }
        }, true);
    }
    function bfStats(id){
        ReturnRequest('E_DisplayStatsBF.php?user=' + id,0,function(responseText){
            //responseText.setAttribute('style', 'opacity:0.4;border-radius: 150px;-webkit-border-radius: 150px;-moz-border-radius: 150px;');

            DisplayMessage(responseText);
        });
    }
    function battlefield() {
        getNav();
        $('html > body > table > tbody > tr > td > table > tbody > tr > th').remove();
        var usetgold = '';
        var alltables = document.getElementsByTagName('table');
        var i;
        for (i=0;i<alltables.length;i++){

            if(alltables[i].rows[0].cells.length>1){
                //alert(alltables[i].rows[0].cells.length);
                if(alltables[i].rows[0].cells[1].innerHTML.match("Alliance")){
                    //alert(alltables[i].rows[0].cells[1].innerHTML.match("Alliance"));
                    var ms_table = alltables[i];
                    //alert(ms_table);
                }
            }
        }
        var rows,ii,iii;
        rows = ms_table.rows;
        //alert(rows);
        ii=0;
        iii=0;
        var countids=0;
        var goldz=Array();
        var names=Array();
        var ids=Array();
        var tff=Array();
        var tag=Array();
        var reqnames=Array();
        var rank=Array();
        var online=Array();
        var BattiefieldArray = new Array();
        //alert(goldz);

        for (i=2;i<rows.length-1;i++){
            if(InStr(rows[i].cells[2].childNodes[0].style.cssText,"rgb") == true){
                online[ii] = '1';
            }else{
                online[ii] = '0';
            }
            tff[ii]=rows[i].cells[3].innerHTML.replace(/,/g,"");
            goldz[ii]=rows[i].cells[5].innerHTML.replace(" Gold","").replace(/,/g,"");
            names[ii]=rows[i].cells[2].childNodes[0].innerHTML;
            var link = String(document.URL).substr(String(document.URL).indexOf('/playground')+1, 10);

            if(link == 'playground'){
                ids[ii]=rows[i].cells[2].childNodes[0].href.replace("https://playground.kingsofchaos.com/stats.php?id=","");
            } else {
                ids[ii]=rows[i].cells[2].childNodes[0].href.replace("https://www.kingsofchaos.com/stats.php?id=","");
            }
            rank[ii]=rows[i].cells[6].innerHTML.replace(/,/g,"");

            usetgold = usetgold + "[d]u=" + names[ii] + "*g=" + goldz[ii] + "*o=" + online[ii] + "*t=" + tff[ii] + "---s=" + ids[ii] + "*[/d]"; //"--s=" + ids[ii] + "--[/dude]";

            //alert(ids[ii]);
            if(rows[i].cells[5].innerHTML.indexOf("???")==-1){
                BattiefieldArray[i-1] = new Array(goldz[ii],'<a href="stats.php?id=' + ids[ii] + '">' + names[ii] + '</a>',tff[ii]);
                //alert(BattiefieldArray[i-1]);
            }
            ii++;
        }

        SortIt(BattiefieldArray,0,1,2,3);
        BattiefieldArray.reverse();
        var newhtml = '<table border="1" bordercolor="#111111" width="100%" id="AutoNumber1"><tr><td width="33%">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
            '<td width="33%">TFF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
            '<td width="34%">Gold&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
        for(i=0;i<BattiefieldArray.length;i++){
            if(String(BattiefieldArray[i]) == 'undefined'){
            }else{
                newhtml += '  <tr>'+
                    '<td width="33%">' + BattiefieldArray[i][1] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
                    '<td width="33%">' + addCommas(BattiefieldArray[i][2]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
                    '<td width="33%">' + addCommas(BattiefieldArray[i][0]) + ' Gold&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>\n'+
                    '</tr>';
            }
        }
        newhtml += '</table>';
        //document.getElementById("table_lines battlefield").innerHTML = newhtml;
        params = "list="+usetgold;
        //+"&getId="+GM_getValue("userid")+"&getUser="+whoami+"&page="+page
        logBattlefield(params,function(html){
            //ReturnRequest("GM_BattlefieldGold.php&list=" + usetgold,function(html){
            dothis(html);
            //DisplayMessage("Data Collected");
        });
        //ReturnRequest('E_BattlefieldGold.php?'+params,0,function(html){
        //dothis(html);
        //});
    }
    function battlefield2(){
        //$('html > body > table > tbody > tr > td > p > table > tbody > tr.nav').remove();
        $('html > body > table > tbody > tr > td > table > tbody > tr > th').remove();
        var usetgold = '';
        var alltables = document.getElementsByTagName('table');
        var i;
        for (i=0;i<alltables.length;i++){
            if(alltables[i].rows[0].cells.length>1){
                if(alltables[i].rows[0].cells[1].innerHTML.match("Alliance")){
                    var ms_table = alltables[i];
                }
            }
        }
        var rows,
            ii,
            iii;
        rows = ms_table.rows;
        ii=0;
        iii=0;
        var countids=0;
        var goldz=Array();
        var names=Array();
        var ids=Array();
        var tff=Array();
        var tag=Array();
        var reqnames=Array();
        var rank=Array();
        var online=Array();
        var BattiefieldArray = new Array();

        for (i=2;i<rows.length-1;i++){
            //console.log(rows[i].cells[3].childNodes[0].style.cssText);
            if(InStr(rows[i].cells[2].childNodes[0].style.cssText,"rgb") == true){
                online[ii] = '1';
            }else{
                online[ii] = '0';
            }
            tff[ii]=rows[i].cells[3].innerHTML.replace(/,/g,"");
            goldz[ii]=rows[i].cells[5].innerHTML.replace(" Gold","").replace(/,/g,"");
            names[ii]=rows[i].cells[2].childNodes[0].innerHTML;
            var link = String(document.URL).substr(String(document.URL).indexOf('/playground')+1, 10);
            if(link == 'playground'){
                ids[ii]=rows[i].cells[2].childNodes[0].href.replace("https://playground.kingsofchaos.com/stats.php?id=","");
            } else {
                ids[ii]=rows[i].cells[2].childNodes[0].href.replace("https://www.kingsofchaos.com/stats.php?id=","");
            }
            //ids[ii]=rows[i].cells[2].childNodes[0].href.replace("https://www.kingsofchaos.com/stats.php?id=","");

            rank[ii]=rows[i].cells[6].innerHTML.replace(/,/g,"");

            usetgold = usetgold + "[d]u=" + names[ii] + "*g=" + goldz[ii] + "*o=" + online[ii] + "*t=" + tff[ii] + "---s=" + ids[ii] + "*[/d]"; //"--s=" + ids[ii] + "--[/dude]";


            if(rows[i].cells[5].innerHTML.indexOf("???")==-1){
                BattiefieldArray[i-1] = new Array(goldz[ii],'<a href="stats.php?id=' + ids[ii] + '">' + names[ii] + '</a>',tff[ii]);

            }
            ii++;
        }
        SortIt(BattiefieldArray,0,1,2,3);
        BattiefieldArray.reverse();
        var newhtml = '<table border="1" bordercolor="#111111" width="100%" id="AutoNumber1"><tr><td width="33%">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
            '<td width="33%">TFF&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
            '<td width="34%">Gold&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
        for(i=0;i<BattiefieldArray.length;i++){
            if(String(BattiefieldArray[i]) == 'undefined'){
            }else{
                newhtml += '  <tr>'+
                    '<td width="33%">' + BattiefieldArray[i][1] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
                    '<td width="33%">' + addCommas(BattiefieldArray[i][2]) + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>'+
                    '<td width="33%">' + addCommas(BattiefieldArray[i][0]) + ' Gold&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>\n'+
                    '</tr>';
            }
        }

        newhtml += '</table>';
        //document.getElementById("table_lines battlefield").innerHTML = newhtml;
        params = "list="+usetgold;
        //+"&getId="+GM_getValue("userid")+"&getUser="+whoami+"&page="+page
        logBattlefield(params,function(html){
            //ReturnRequest("GM_BattlefieldGold.php&list=" + usetgold,function(html){
            dothis(html);
            //DisplayMessage("Data Collected");
        });
        //ReturnRequest('E_BattlefieldGold.php?'+params,1,function(html){
        //dothis(html);
        //});
    }
    function dothis(html){
        if (GM_getValue('gr',false)==true) {
            var i;
            var alltables = document.getElementsByTagName('table');
            for (i=0;i<alltables.length;i++){
                if(alltables[i].rows[0].cells.length>1){
                    if(alltables[i].rows[0].cells[1].innerHTML.match("Alliance")){
                        var ms_table = alltables[i];
                    }
                }
            }
            var rows,ii,iii;
            rows = ms_table.rows;
            ii=0;
            iii=0;

            var tmpGoldhrly;
            //var tmpGoldhdly;
            //alert(rows);
            var BattiefieldArray = new Array();
            for (i=1;i<rows.length-1;i++){
                if(html.match(rows[i].cells[2].childNodes[0].innerHTML)){
                    //alert(rows[i].cells[2].childNodes[0].innerHTML);
                    //alert(html);

                    tmpGoldhrly = FindText(html,rows[i].cells[2].childNodes[0].innerHTML,"*"); //
                    //alert(tmpGoldhrly);
                    tmpGoldhrly = tmpGoldhrly.replace(";",' </font><font color=yellow>');// + '</font>';
                    //alert(html);
                    rows[i].cells[5].innerHTML = '<font color=dodgerblue>' + tmpGoldhrly;//  + '</font>';
                    //alert(html);
                    tmpGoldhrly='';
                }
            }
        }
    }
    function logBattlefield(data,cb){
        GM_xmlhttpRequest({
            method: "POST",
            url: GM_getValue("serverURL") + "/script/backend/E_BattlefieldGold.php",
            headers:{'Content-type':'application/x-www-form-urlencoded'},
            data:encodeURI(data),
            onload: function(xhr) {
                cb(xhr.responseText);
            }
        });
    }
    function findFirstDescendant(parent, tagname){
        parent = document.getElementById(parent);
        var descendants = parent.getElementsByTagName(tagname);
        if ( descendants.length )
            return descendants[0];
        return null;
    }

    function attack(){
        $('html > body > table > tbody > tr > td > table > tbody > tr > th').remove();
        var page = ( arguments.length < 1 ? document.body.innerHTML : arguments[0] );
        var th = GetTag('th', "Sabotage Mission");//G
        var stuff = document.body.innerHTML;
        var userid = String(document.URL).substr(String(document.URL).indexOf('=')+1, 7);
        var target = GetText("Target:", "\">", "<");


        if (InStr(stuff,"Invalid User ID") == true) {
            ReturnRequest('E_Active.php?id=' + userid,1,function(r){
                var newhtml;
                newhtml = stuff.replace("Invalid User ID",'Invalid UserID (Vacation mode or deleted)<br>' + r);
                document.body.innerHTML = newhtml;
                //alert(userid);
            });
            /*ReturnRequest('DeleteStat.php?id=' + userid + '&a=0',1,function(r){
			//alert("deleted");
		});*/
        }
        isTurn();

        if (GM_getValue("RL_SALThide6",0) == 0) {
            var name = FindText(FindText(stuff,'"stats.php?id=',"a>"),">","<");//<th colspan="2">Sabotage Mission</th>
            ReturnRequest('SabFocus.php?name=' + name,0,function(responseText){
                var exist = FindText(responseText,"<focus=","></focus>");
                if (GM_getValue('war', false) || exist == 'Whatever' || exist == 'SA' || exist == 'DA' || exist == 'SPY' || exist == 'SENTRY') {
                    focussab = '<tr><td>Focus Sab: </td><td> ' + FindText(responseText,"<focus=","></focus>") + '</td></tr>';
                    th.parentNode.parentNode.insertRow(6).innerHTML = focussab;
                }
            });

            // Add +1 and +5 buttons
            document.getElementsByName('numsab')[0].parentNode.innerHTML = "<input size=\"3\" name=\"numsab\" value=\"" + GM_getValue(target + '_kocsabnum',"1") + "\" type=\"text\"><button style=\"margin-left: 10px;\" name=\"plus_one\">+1</button><button style=\"margin-left: 10px;\" name=\"plus_five\">+5</button>";
            document.getElementsByName('numspies')[0].parentNode.innerHTML = "<input size=\"3\" name=\"numspies\" value=\"" + GM_getValue(target + '_kocsabspynum',"1") + "\" type=\"text\"><button style=\"margin-left: 10px;\" name=\"plus_one_spies\">+1</button>";
        }
        var user = FindText(FindText(stuff,'"stats.php?id=',"a>"),">","<");
        GM_setValue('SAB_USER_NAME',user);
        gUser = FindText(FindText(stuff,'"stats.php?id=',"a>"),">","<");;
        var whoami = GM_getValue("Koc_User");
        var getSabValue = rmCommas(FindText(FindText(stuff,'<td>Total sabbed already today</td>',"</tr>"),">","<"));

        ReturnRequest('E_AAT.php?user='+user+'&me='+whoami+'&sabValue='+getSabValue,0,function(responseText){//+'&sabValue='+getSabValue
            var responseStr = '';
            var statsTable;
            var armoryInfoTable;
            var canOrCant = 'DO NOT KNOW', notStrike = 0, notDefense = 0, notSpy = 0, notSentry = 0, notStrike_Time = 0, notDefense_Time = 0, notSpy_Time = 0, notSentry_Time = 0, notGold = 0, notGold_Time = 0;
            var myInfo = responseText.split(',');
            //myInfo.sort(function(a,b){return a.getTime() - b.getTime()});
            //alert(myInfo);
            //console.log("PHP: ",myInfo);
            for (var i=0;i<myInfo.length;i++) {
                myInfo[i] = trim(myInfo[i]);
                notStrike = parseInt(FindText(myInfo[i],'strike=','</td>'));
                notDefense = parseInt(FindText(myInfo[i],'defense=',"</td>"));
                notSpy = parseInt(FindText(myInfo[i],'spy=',"</td>"));
                notSentry = parseInt(FindText(myInfo[i],'sentry=',"</td>"));
                notStrike_Time = FindText(myInfo[i],'strike_time="',' ago"</td>');
                notDefense_Time = FindText(myInfo[i],'defense_time="',' ago"</td>');
                notSpy_Time = FindText(myInfo[i],'spy_time="',' ago"</td>');
                notSentry_Time = FindText(myInfo[i],'sentry_time="',' ago"</td>');
                notGold = parseInt(FindText(myInfo[i],'gold=',"</td>"));
                notGold_Time = FindText(myInfo[i],'goldage="',' ago"</td>');

                var bpm_time, ch_time, is_time, ds_time, nun_time, key_time, hook_time,
                    rope_time, lt_time, dog_time, candle_time;
                /*Never Updated! red*/
                /*12 hours or less orange*/
                /*1 hour or less green*/
                //var styleRed = "font-size:12px;color:red;";
                //var styleOrange = "font-size:12px;color:orange;";
                //var styleGreen = "font-size:12px;color:green;";
                var timeStyleChngr = {never:"font-size:12px;color:red;", hours:"font-size:12px;color:orange;", less:"font-size:12px;color:green;"};
                var bpmStyleOption,chStyleOption,isStyleOption;
                var reg = new RegExp("\d+");
                //for (var l = 0; l < timeStyleChngr.length; l++) {
                //console.log(notMyWeapons[a]);
                //console.log(timeStyleChngr[l].keys);
                //}

                /*1.*/bpm_time = FindText(myInfo[i],'bpm_time="',' ago"</td>');
                if(bpm_time=='49 years'){ bpm_time = 'Never Updated!'; } else { bpm_time = bpm_time+' ago'; }
                var bpmFont = bpm_time.substring(0, +1);
                //var bpmMatch = bpmFont.match(reg);
                bpmStyleOption = (bpmFont != 'null') && bpmFont > 1 ? timeStyleChngr.less : timeStyleChngr.never;
                bpmStyleOption += (bpmFont != 'null') && bpmFont < 12 ? timeStyleChngr.hours : timeStyleChngr.never;
                bpmStyleOption += (bpmFont == 'null') ? timeStyleChngr.never : '';
                /*2.*/ch_time = FindText(myInfo[i],'ch_time="',' ago"</td>');
                if(ch_time=='49 years') ch_time = 'Never Updated!'; else ch_time = ch_time+' ago';
                var chFont = ch_time.substring(0, +1);
                chStyleOption = (chFont != 'null') && chFont > 1 ? timeStyleChngr.less : timeStyleChngr.never;
                chStyleOption += (chFont != 'null') && chFont < 12 ? timeStyleChngr.hours : timeStyleChngr.never;
                chStyleOption += (chFont == 'null') ? timeStyleChngr.never : '';
                /*3.*/is_time = FindText(myInfo[i],'is_time="',' ago"</td>');
                if(is_time=='49 years') is_time = 'Never Updated!'; else is_time = is_time+' ago';
                var isFont = is_time.substring(0, +1);
                isStyleOption = (isFont != 'null') && isFont > 1 ? timeStyleChngr.less : timeStyleChngr.never;
                isStyleOption += (isFont != 'null') && isFont < 12 ? timeStyleChngr.hours : timeStyleChngr.never;
                isStyleOption += (isFont == 'null') ? timeStyleChngr.never : '';

                /*4.*/ds_time = FindText(myInfo[i],'ds_time="',' ago"</td>');
                //alert(ds_time);//2 days
                if(ds_time=='49 years') ds_time = 'Never Updated!'; else ds_time = ds_time+' ago';
                /*5.*/nun_time = FindText(myInfo[i],'nun_time="',' ago"</td>');
                if(nun_time=='49 years') nun_time = 'Never Updated!'; else nun_time = nun_time+' ago';
                /*6.*/key_time = FindText(myInfo[i],'key_time="',' ago"</td>');
                if(key_time=='49 years') key_time = 'Never Updated!'; else key_time = key_time+' ago';
                /*7.*/hook_time = FindText(myInfo[i],'hook_time="',' ago"</td>');
                if(hook_time=='49 years') hook_time = 'Never Updated!'; else hook_time = hook_time+' ago';
                /*8.*/rope_time = FindText(myInfo[i],'rope_time="',' ago"</td>');
                if(rope_time=='49 years') rope_time = 'Never Updated!'; else rope_time = rope_time+' ago';
                /*9.*/lt_time = FindText(myInfo[i],'lt_time="',' ago"</td>');
                if(lt_time=='49 years') lt_time = 'Never Updated!'; else lt_time = lt_time+' ago';
                /*10.*/dog_time = FindText(myInfo[i],'dog_time="',' ago"</td>');
                if(dog_time=='49 years') dog_time = 'Never Updated!'; else dog_time = dog_time+' ago';
                /*11.*/candle_time = FindText(myInfo[i],'candle_time="',' ago"</td>');
                if(candle_time=='49 years') candle_time = 'Never Updated!'; else candle_time = candle_time+' ago';

                canOrCant = FindText(myInfo[i],'<table id="sabpage_info" cellpadding="0" cellspacing="0"><tr><td>',' Sab!');
                //alert(notStrike);
                if(notStrike_Time=='49 years') notStrike_Time = 'Never Updated!'; else notStrike_Time = notStrike_Time+' ago';
                if(notDefense_Time=='49 years') notDefense_Time = 'Never Updated!'; else notDefense_Time = notDefense_Time+' ago';
                if(notSpy_Time=='49 years') notSpy_Time = 'Never Updated!'; else notSpy_Time = notSpy_Time+' ago';
                if(notSentry_Time=='49 years') notSentry_Time = 'Never Updated!'; else notSentry_Time = notSentry_Time+' ago';
                if(notStrike!='undefined') notStrike = addCommas(notStrike); else if(notStrike=='???')notStrike = 0;
                if(notDefense!='NaN') notDefense = addCommas(notDefense); else if(notDefense=='???')notDefense = 0;
                if(notSpy!='NaN') notSpy = addCommas(notSpy); else if(notSpy=='???')notSpy = 0;
                if(notSentry!='NaN') notSentry = addCommas(notSentry); else if(notSentry=='???')notSentry = 0;
                if(notGold) notGold = addCommas(notGold);
                if(notGold_Time=='49 years') notGold_Time = 'Never Updated!'; else notGold_Time = notGold_Time+' ago';
                if(canOrCant == 'Can') canOrCant = '<div style="color:green;">Can Sab!</div>'; else if(canOrCant == "Can`t") canOrCant = '<div style="color:red;">Can`t Sab!</div>';
                //alert(canOrCant);//<table id="sabpage_info" cellpadding="0" cellspacing="0"><tr><td>Can`t
                //}
                //}
                var notMyWeapons = [
                    ['Blackpowder Missile', parseInt(FindText(myInfo[i],'bpm=','</td>'))],
                    ['Chariot', parseInt(FindText(myInfo[i],'ch=','</td>'))],
                    ['Invisibility Shield', parseInt(FindText(myInfo[i],'is=','</td>'))],
                    ['Dragonskin', parseInt(FindText(myInfo[i],'ds=','</td>'))],
                    ['Nunchaku', parseInt(FindText(myInfo[i],'nun=','</td>'))],
                    ['Skeleton Key', parseInt(FindText(myInfo[i],'key=','</td>'))],
                    ['Grappling Hook', parseInt(FindText(myInfo[i],'hook=','</td>'))],
                    ['Rope', parseInt(FindText(myInfo[i],'rope=','</td>'))],
                    ['Lookout Tower', parseInt(FindText(myInfo[i],'lt=','</td>'))],
                    ['Guard Dog', parseInt(FindText(myInfo[i],'dog=','</td>'))],
                    ['Big Candle', parseInt(FindText(myInfo[i],'candle=','</td>'))]
                ];
                var weapAAT = [];
                for (var a = 0; a < notMyWeapons.length; a++) {
                    console.log(notMyWeapons[a]);
                    //console.log('WEAPAAT: '+FindText(myInfo[i],""+notMyWeapons[a][0]+"< aat=",">"));//Blackpowder Missile< aat=0>
                    weapAAT[a] = parseInt(FindText(myInfo[i],""+notMyWeapons[a][0]+"< aat=",">"));
                    //console.log('WEAPAAT: ',weapAAT[a]);
                    //alert(weapAAT[a]);
                    if(isNaN(weapAAT[a])) weapAAT[a] = 'Needs Developers ATTN.';
                }

                statsTable = '<table class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">'+
                    '<tr><th colspan="4">'+ user + '`s Recent Stats' +
                    //FindText(responseText,"<sov=","></sov>") +
                    '</th></tr>'+
                    '<tr><th class="subh" align="left">Stat</th><th class="subh" align="right">Rating</th><th class="subh"></th><th class="subh">Time</th></tr>'+
                    '<tr><td><b>Strike Action</b></td><td align="right">'+notStrike+'</td><td></td><td>'+notStrike_Time+'</td></tr>'+//' + FindText(responseText,"<sa=","></sa>").split("|")[0] + ',' + FindText(responseText,"<sa_time=","></sa_time>") + '
                    '<tr><td><b>Defensive Action</b></td><td align="right">'+notDefense+'</td><td></td><td>'+notDefense_Time+'</td></tr>'+
                    '<tr><td><b>Spy Rating</b></td><td align="right">'+notSpy+'</td><td></td><td>'+notSpy_Time+'</td></tr>'+
                    '<tr><td><b>Sentry Rating</b></td><td align="right">'+notSentry+'</td><td align="left"><b>'+canOrCant+'</b></td><td>'+notSentry_Time+'</td></tr>'+
                    '<tr style="color:gold; background-color:#34495e;"><td style="color:#f4d03f;"><b>Gold</b></td><td align="right" style="color:#f4d03f;">' +notGold+'</td><td></td><td>'+notGold_Time+'</td></tr>'+
                    '</table>'+
                    //armoryInfoTable =

                    '<table style="table-layout:fixed;" class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">'+
                    '<tr><th colspan="4">Armory Information <span style="color:orangered; font-size: 11px;">(Recon to update AAT)</span> <button name="reset_aat">Reset AAT</button></th></tr>'+

                    '<tr><th class="subh" style="font-size: 12px;"><b>Clickable</b></th><th class="subh" style="font-size: 12px;" align="center"><b>AAT</b></th>'+
                    '<th class="subh" style="font-size: 12px;" align="center"><b>In Stock</b></th><th class="subh" style="font-size: 12px;" align="center"><b>Time</b></th>'+
                    '</tr>'+

                    //font-size:12px;color:red;
                    '<tr><td id="b_missle" style="color: yellow;font-size: 12px;font-weight:bolder;">'+notMyWeapons[0][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_missle">'+weapAAT[0]+'</td>'+
                    '<td style="font-size:12px;" align="center">'+addCommas(notMyWeapons[0][1])+'</td>'+
                    '<td style="'+bpmStyleOption+'" align="center">'+bpm_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<BPMBUYSELL=","></BPMBUYSELL>") + '</td>
                    '</tr>'+
                    '<tr><td id="b_ch" style="color: yellow;font-size: 12px;">'+notMyWeapons[1][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_ch">'+weapAAT[1]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[1][1])+'</td>'+
                    '<td style="'+chStyleOption+'" align="center">'+ch_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<CHBUYSELL=","></CHBUYSELL>") + '</td></tr>'+
                    '</tr>'+
                    '<tr><td id="b_ishield" style="color: yellow;font-size: 12px;font-weight:bolder;">'+notMyWeapons[2][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_ishield">'+weapAAT[2]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[2][1])+'</td>'+
                    '<td style="'+isStyleOption+'" align="center">'+is_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<ISBUYSELL=","></ISBUYSELL>") + '</td></tr>'+
                    '</tr>'+
                    '<tr><td id="b_skin" style="color: yellow;font-size: 12px;">'+notMyWeapons[3][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_skin">'+weapAAT[3]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[3][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+ds_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<DSBUYSELL=","></DSBUYSELL>") + '</td></tr>'+
                    '</tr>'+
                    '<tr><td id="b_nun" style="color: yellow;font-size: 12px;font-weight:bolder;">'+notMyWeapons[4][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_nun">'+weapAAT[4]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[4][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+nun_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<NUNBUYSELL=","></NUNBUYSELL>") + '</td></tr>'+
                    '</tr>'+
                    '<tr><td id="b_key" style="color: yellow;font-size: 12px;">'+notMyWeapons[5][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_key">'+weapAAT[5]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[5][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+key_time+
                    '</td></tr>'+
                    '<tr><td id="b_hook" style="color: yellow;font-size: 12px;">'+notMyWeapons[6][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_hook">'+weapAAT[6]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[6][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+hook_time+
                    '</td>'+
                    '</tr>'+
                    '<tr><td id="b_rope" style="color: yellow;font-size: 12px;">'+notMyWeapons[7][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_rope">'+weapAAT[7]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[7][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+rope_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<LTBUYSELL=","></LTBUYSELL>") + '</td></tr>'+
                    '</tr>'+
                    '<tr><td id="b_tower" style="color: yellow;font-size: 12px;font-weight:bolder;">'+notMyWeapons[8][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_tower">'+weapAAT[8]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[8][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+lt_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center"></td></tr>'+
                    '</tr>'+
                    '<tr><td id="b_dog" style="color: yellow;font-size: 12px;">'+notMyWeapons[9][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_dog">'+weapAAT[9]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[9][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+dog_time+
                    '</td>'+
                    //'<td style="font-size: 12px;" align="center"></td></tr>'+
                    '</tr>'+
                    '<tr><td id="b_candle" style="color: yellow;font-size: 12px;">'+notMyWeapons[10][0]+'</td>'+
                    '<td style="font-size:12px;color:red;" align="center" id="btn_candle">'+weapAAT[10]+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+addCommas(notMyWeapons[10][1])+'</td>'+
                    '<td style="font-size: 12px;" align="center">'+candle_time+
                    '</td></tr>'+
                    '</table>';

                var cID = getClassIndex('table_lines','Personnel');
                if(!String(cID).match('undefined')){
                    document.getElementsByClassName('table_lines')[cID].innerHTML = statsTable;
                    //document.getElementsByClassName('table_lines')[cID].innerHTML = armoryInfoTable;
                }
                //if (responseStr.length > 0) responseStr = responseStr+'|';
            }

            //alert(getMatch);
            GM_setValue('USER_INFO_SAV',responseText);
            //var ButtonsToAdd='<input type="submit" id="infoBut" title="" value="'+user+'`s Info" onClick="this.value=\'Fetching '+user+'`s Info\';this.disabled=true;return false;" style="text-align:left;"  />';
            //ButtonsToAdd+=document.getElementsByClassName('table_lines')[0].innerHTML;//getElementsByTagName
            //document.getElementsByClassName('table_lines')[0].innerHTML=ButtonsToAdd;

            var attackClassID = getClassIndex('table_lines','Attack Mission');
            if(!String(attackClassID).match('undefined')){
                document.getElementsByName('raidbut')[0].parentNode.innerHTML = '<td><input type="submit" id="infoBut" title="" value="'+user+'`s Info" onClick="this.value=\'Fetching '+user+'`s Info\';this.disabled=true;return false;" style="text-align:center;float:right;"  /> </td><td align="left">  <input name="raidbut" onclick="document.attack.raidbut.value=\'Raiding..\'; document.attack.raidbut.disabled=true; document.attack.attack_type.value = \'raid\'; document.attack.submit();" value="Raid!" type="submit"> <input name="attackbut" onclick="document.attack.attackbut.value=\'Attacking..\'; document.attack.attackbut.disabled=true; document.attack.submit();" value="Attack!" type="submit"></td>';

                //<input name="raidbut" onclick="document.attack.raidbut.value='Raiding..'; document.attack.raidbut.disabled=true; document.attack.attack_type.value = 'raid'; document.attack.submit();" value="Raid!" type="submit">
                //var attackTH = document.getElementsByClassName('table_lines')[attackClassID].getElementsByTagName('tr');
                //attackTH[0].cells[0].setAttribute('colspan','2');
                //attackTH[3].insertCell(0).innerHTML = '<td style="align:right;float:right;"><input type="submit" id="infoBut" title="" value="'+user+'`s Info" onClick="this.value=\'Fetching '+user+'`s Info\';this.disabled=true;return false;" style="text-align:center;float:right;"  /></td>';
                document.getElementById("infoBut").addEventListener('click', sabInfo, true);
            }
            //alert(GM_getValue('USER_INFO_SAV'));

            //else {
            //}
            //DisplayMessage(responseText);
            //GM_setValue(target+"Koc_TotalSabbed_Value",0);
            //alert(responseText);
            //alert(GM_getValue(target +"Koc_TotalSabbed_Value"));

            //if(getSabValue == GM_getValue(target +"Koc_TotalSabbed_Value")) {
            //maxed
            //alert("MAXED");
            //} else if (getSabValue < GM_getValue(target +"Koc_TotalSabbed_Value")) {
            //not maxed
            //GM_setValue(target+"Koc_TotalSabbed_Value",getSabValue);
            //alert("NOT MAXED");
            //GM_setValue("Koc_TotalSabbed_Time",hour);
            //} else if (getSabValue > GM_getValue(target +"Koc_TotalSabbed_Value") || getSabValue == 0) {
            //GM_setValue(target+"Koc_TotalSabbed_Value",getSabValue);
            //alert("Set1");
            //GM_setValue("Koc_TotalSabbed_Check",getSabValue);
            //} else {
            //GM_setValue(target+"Koc_TotalSabbed_Value",getSabValue);
            //alert("Set2");
            //}
            //alert(GM_getValue(target +"Koc_TotalSabbed_Value"));



            //location.href = "#sab";
            //var getWPN = setValue('',)
            //var tfftbg = FindText(responseText,"<tfbg=","></tfbg>");
            // alert(responseText);
            /* var tab_bpm_aat = FindText(responseText,"<bpmaat=","></bpmaat>").split("|")[0];
            var tab_ivs_aat = FindText(responseText,"<isaat=","></isaat>").split("|")[0];
            var tab_nun_aat = FindText(responseText,"<nunaat=","></nunaat>").split("|")[0];
            var tab_lt_aat = FindText(responseText,"<ltaat=","></ltaat>").split("|")[0];
            var tab_ch_aat = FindText(responseText,"<chaat=","></chaat>").split("|")[0];
            var tab_ds_aat = FindText(responseText,"<dsaat=","></dsaat>").split("|")[0];
            var tab_key_aat = FindText(responseText,"<keyaat=","></keyaat>").split("|")[0];
            var tab_dog_aat = FindText(responseText,"<dogaat=","></dogaat>").split("|")[0];
            var tab_hook_aat = FindText(responseText,"<hookaat=","></hookaat>").split("|")[0];
            var tab_candle_aat = FindText(responseText,"<candleaat=","></candleaat>").split("|")[0];
            var tab_rope_aat = FindText(responseText,"<ropeaat=","></ropeaat>").split("|")[0]; */

            //var instock_bpm = FindText(responseText,"<bpm=","></bpm>");//<bpm=".number_format($bpm)."|$ga></bpm>
            //alert(instock_bpm.split("|")[0]);
            /* var instock_is = FindText(responseText,"<is=","></is>");
            var instock_nun = FindText(responseText,"<nun=","></nun>");
            var instock_lt = FindText(responseText,"<lt=","></lt>");
            var instock_ch = FindText(responseText,"<ch=","></ch>");
            var instock_ds = FindText(responseText,"<ds=","></ds>");
            var instock_key = FindText(responseText,"<key=","></key>");
            var instock_dog = FindText(responseText,"<dog=","></dog>");
            var instock_hook = FindText(responseText,"<hook=","></hook>");
            var instock_candle = FindText(responseText,"<candle=","></candle>");
            var instock_rope = FindText(responseText,"<rope=","></rope>");
            var user_sab = FindText(responseText,"<sabspy=","></sabspy>");
            var your_SabValue = FindText(responseText,"<yoursabspy=","></yoursabspy>"); */
            //var bpmBSValue = FindText(responseText,"<BPMBUYSELL=","></BPMBUYSELL>").split("|");
            //var bpmValue = [];
            //var bpm0 = 0;
            //var bpm1 = 1;
            //for (var i=0;i<bpmBSValue.length;i++) {
            //bpmValue = bpmBSValue[i];
            //alert(bpmValue);
            //}


            //var table;
            //addCSS('table {border-collapse: collapse;}tr { border: solid;border-width: 1px 0;}');
            /*table = '<table class="table_lines" width="100%" cellspacing="0" cellpadding="6" border="0">'+
                '<tr><th colspan="4">'+ user + '`s Recent Stats SOV = ' + FindText(responseText,"<sov=","></sov>") + '</th></tr>'+

                '<tr><td><b>Strike Action</b></td><td align="right">statSA</td><td></td><td>time</td></tr>'+//' + FindText(responseText,"<sa=","></sa>").split("|")[0] + ',' + FindText(responseText,"<sa_time=","></sa_time>") + '

                '<tr><td><b>Defensive Action</b></td><td align="right">' +
				//FindText(responseText,"<da=","></da>").split("|")[0] +
				'</td><td></td><td>' +
				//FindText(responseText,"<da_time=","></da_time>") +
				'</td></tr>'+

                '<tr><td><b>Spy Rating</b></td><td align="right">' +
				//FindText(responseText,"<spy=","></spy>").split("|")[0] +
				'</td><td></td><td>' + FindText(responseText,"<spy_time=","></spy_time>") +
				'</td></tr>'+

                '<tr><td><b>Sentry Rating</b></td><td align="right">' +
				//FindText(responseText,"<sentry=","></sentry>").split("|")[0] +
				'</td><td align="left"><b>'+
				//user_sab+
				'</b></td><td>' +
				//FindText(responseText,"<sentry_time=","></sentry_time>") +
				'</td></tr>'+

                '<tr style="color:gold; background-color:#34495e;"><td style="color:#f4d03f;"><b>Gold</b></td><td align="right" style="color:#f4d03f;"><b>' +
				//FindText(responseText,"<gg=","></gg>").split("|")[0] +
				'</b></td><td></td><td style="color:#f4d03f;"></td></tr>'+//(' + FindText(responseText,"<gg=","></gg>").split("|")[1] + ')
                '<tr style="background-color:#424949;"><td><b>Your Sab Value:</b></td><td style="color:orangered;" align="right"></td><td></td><td></td></tr>'+//'+your_SabValue+'

                '<tr style="background-color:#424949;"><td><b>TFF Size:</b></td><td align="center"></td><td><b>TBG(est.):</b></td><td></td></tr>'+//(' + tfftbg.split("|")[1] + ' TBG)
                //'<tr><td colspan="4"><hr style="color:white;background-color:black;" /></td></tr>'+//' + tfftbg.split('|')[0] + '
                '</table>'+
                //'<tr><th colspan="4">Armory Information Estimated SOV = ' + FindText(responseText,"<sov=","></sov>") + ' <button name="reset_aat">Reset AAT</button></th></tr>'+
                //'<tr><td><b>Clickable</b></td><td><b>AAT</b></td><td><b>In Stock</b></td><td><b>Time</b></td><td><b>Clickable</b></td><td><b>AAT</b></td><td><b>In Stock</b></td><td><b>Time</b></td></tr>'+

                //'<hr color="#ff0000" height="20%" width="200%" />'+
                '<table class="table_lines instock"  width="100%" cellspacing="0" cellpadding="6" border="0">'+
                '<tr><th colspan="5">Armory Information <span style="color:orangered; font-size: 11px;">(Recon to update AAT)</span> <button name="reset_aat">Reset AAT</button></th></tr>'+

                '<tr><td style="font-size: 12px;"><b>Clickable</b></td><td style="font-size: 12px;" align="center"><b>AAT</b></td>'+
                '<td style="font-size: 12px;" align="center"><b>In Stock</b></td><td style="font-size: 12px;" align="center"><b>Time</b></td>'+
                //'<td class="subh">Buy/Sell</td></tr>'+

                '<tr><td id="b_missle" style="color: yellow;font-size: 12px;">Blackpowder Missiles</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_missle"></td>'+//tab_bpm_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_bpm.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<bpm_time=","></bpm_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<BPMBUYSELL=","></BPMBUYSELL>") + '</td></tr>'+

                '<tr><td id="b_ch" style="color: yellow;font-size: 12px;">Chariots</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_ch"></td>'+//tab_ch_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_ch.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<ch_time=","></ch_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<CHBUYSELL=","></CHBUYSELL>") + '</td></tr>'+

                '<tr><td id="b_ishield" style="color: yellow;font-size: 12px;">Invisibility Shields</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_ishield"></td>'+//tab_ivs_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_is.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<is_time=","></is_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<ISBUYSELL=","></ISBUYSELL>") + '</td></tr>'+

                '<tr><td id="b_skin" style="color: yellow;font-size: 12px;">Dragonskin</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_skin"></td>'+//tab_ds_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_ds.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<ds_time=","></ds_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<DSBUYSELL=","></DSBUYSELL>") + '</td></tr>'+

                '<tr><td id="b_nun" style="color: yellow;font-size: 12px;">Nunchakus</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_nun"></td>'+//tab_nun_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_nun.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<nun_time=","></nun_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<NUNBUYSELL=","></NUNBUYSELL>") + '</td></tr>'+

                '<tr><td id="b_key" style="color: yellow;font-size: 12px;">Keys</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_key"></td>'+//tab_key_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_key.split("|")[0]
                '<td style="font-size: 12px;" align="center">' + FindText(responseText,"<key_time=","></key_time>").split("|")[0] + '</td>'+
                //'<td style="font-size: 12px;" align="center"></td></tr>'+

                '<tr><td id="b_dog" style="color: yellow;font-size: 12px;">Guard Dogs</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_dog"></td>'+//tab_dog_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_dog.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<dog_time=","></dog_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center"></td></tr>'+

                '<tr><td id="b_tower" style="color: yellow;font-size: 12px;">Lookout Towers</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_tower"></td>'+//tab_lt_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_lt.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<lt_time=","></lt_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center">' + FindText(responseText,"<LTBUYSELL=","></LTBUYSELL>") + '</td></tr>'+

                '<tr><td id="b_hook" style="color: yellow;font-size: 12px;">Grappling Hooks</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_hook"></td>'+//tab_hook_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_hook.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<hook_time=","></hook_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center"></td></tr>'+

                '<tr><td id="b_candle" style="color: yellow;font-size: 12px;">Big Candles</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_candle"></td>'+//tab_candle_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_candle.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<candle_time=","></candle_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center"></td></tr>'+

                '<tr><td id="b_rope" style="color: yellow;font-size: 12px;">Ropes</td>'+
                '<td style="font-size: 12px;" align="center" id="btn_rope"></td>'+//tab_rope_aat
                '<td style="font-size: 12px;" align="center"></td>'+//instock_rope.split("|")[0]
                '<td style="font-size: 12px;" align="center">' +
				//FindText(responseText,"<rope_time=","></rope_time>").split("|")[0] +
				'</td>'+
                //'<td style="font-size: 12px;" align="center"></td></tr>'+
                '</table>';


            //Check to see if any in stock <hr color="#000000" width="100%" />
            var cID = getClassIndex('table_lines','Personnel');
            if(!String(cID).match('undefined')){
                document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
            }
            else {
            }*/
            //});

            var cBut1 = GetElement('input', "Attack!");
            cBut1.value = cBut1.value.replace("Attack!", "Attack!");

            ct_raids = FindText(responseText,"<raidcount=","></raidcount>")
            var cBut2 = GetElement('input', "Raid!");
            cBut2.value = cBut2.value.replace("Raid!", "Raid! ("+ct_raids+")");

            var cBut3 = GetElement('input', "Send Spies");
            cBut3.value = cBut3.value.replace("Send Spies", "Recon!");

            if (GM_getValue("RL_SALThide6",0) == 0) {
                var sab_cnt = FindText(responseText,"<ls_count=","></ls_count>");

                var sab_table = "";
                var tagList = document.getElementsByTagName('th');

                for(var z = 0; z < tagList.length; z++){
                    if(tagList[z].innerHTML.indexOf("Sabotage Mission") == 0){
                        sab_table = tagList[z].parentNode.parentNode;;
                    }
                }

                var last_sab_user = FindText(responseText,"<ls_user=","></ls_user>");

                var last_sab = sab_table.insertRow(sab_table.rows.length);
                var last_sab1 = sab_table.insertRow(sab_table.rows.length);

                last_sab.insertCell(0).innerHTML = "<font color='green'>Last Sab By</font> & <font color='yellow'>Qty</font> & <font color='red'>Weapon:</font>";
                last_sab.insertCell(1).innerHTML = '<td><font color="green">' + last_sab_user + '</font> </td><span id="fill_number" style="color: yellow;">' + FindText(responseText,"<ls_qty=","></ls_qty>") + '</span> <span id="fill_weapon" style="color: red;">'+FindText(responseText,"<ls_type=","></ls_type>")+'</span></td>';

                last_sab1.insertCell(0).innerHTML = "How long ago:";
                last_sab1.insertCell(1).innerHTML = '<td>' + FindText(responseText,"<ls_time=","></ls_time>") + '</td><td align="center"></td>';
                last_sab1.cells[0].width = "50%";

                last_sab.cells[0].width = "50%";

                if (document.getElementsByName('spybut')[0]){
                    document.getElementsByName('spybut')[0].parentNode.innerHTML = '<td><button size="36%" name="fill_button">Fill in last sab!</button>  </td><td align="left">  <input name="spybut" onclick="document.spy.spybut.value=\'Sabotaging..\'; document.spy.spybut.disabled=true; document.spy.submit();" value="Sab!" type="submit"></td>';
                }
                var cBut4 = GetElement('input', "Sab!");
                cBut4.value = cBut4.value.replace("Sab!", "Sab! ("+sab_cnt+")");
            }
        });

        var numsab = 0;
        var sabturn = 5;
        var numspies = 1;
        var enemy_weapon = 0;
        document.addEventListener('click', function(event){
            if (event.target.name == 'lastsab'){
                document.spy.numsab.value=parseInt(numsab);
                //document.spy.sabturns.value=parseInt(sabturn);
                document.spy.numspies.value=parseInt(numspies);
                document.getElementsByTagName("select")[0].value = parseInt(enemy_weapon);

                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));

                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'fill_button' || event.target.id == 'fill_button') {
                document.spy.numsab.value=parseInt(document.getElementById('fill_number').innerHTML);
                //var weapon_number = '';
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                if(document.getElementById('fill_weapon').innerHTML == 'Tripwire'){
                    document.spy.enemy_weapon.value=parseInt(66);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Horn'){
                    document.spy.enemy_weapon.value=parseInt(64);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Big Candle'){
                    document.spy.enemy_weapon.value=parseInt(62);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Rope'){
                    document.spy.enemy_weapon.value=parseInt(58);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Dirk'){
                    document.spy.enemy_weapon.value=parseInt(63);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Cloak'){
                    document.spy.enemy_weapon.value=parseInt(65);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Helmet'){
                    document.spy.enemy_weapon.value=parseInt(34);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Shield'){
                    document.spy.enemy_weapon.value=parseInt(38);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Chainmail'){
                    document.spy.enemy_weapon.value=parseInt(41);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Plate Armor'){
                    document.spy.enemy_weapon.value=parseInt(45);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Gauntlets'){
                    document.spy.enemy_weapon.value=parseInt(48);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Mithril'){
                    document.spy.enemy_weapon.value=parseInt(46);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Elven Cloak'){
                    document.spy.enemy_weapon.value=parseInt(47);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Heavy Shield'){
                    document.spy.enemy_weapon.value=parseInt(49);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Mist Veil'){
                    document.spy.enemy_weapon.value=parseInt(50);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Knife'){
                    document.spy.enemy_weapon.value=parseInt(3);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Staff'){
                    document.spy.enemy_weapon.value=parseInt(7);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Short Bow'){
                    document.spy.enemy_weapon.value=parseInt(8);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Hatchet'){
                    document.spy.enemy_weapon.value=parseInt(9);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Sling'){
                    document.spy.enemy_weapon.value=parseInt(10);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Long Sword'){
                    document.spy.enemy_weapon.value=parseInt(11);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Crossbow'){
                    document.spy.enemy_weapon.value=parseInt(12);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Pike'){
                    document.spy.enemy_weapon.value=parseInt(13);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Club'){
                    document.spy.enemy_weapon.value=parseInt(14);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Longbow'){
                    document.spy.enemy_weapon.value=parseInt(16);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Lance'){
                    document.spy.enemy_weapon.value=parseInt(15);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Spear'){
                    document.spy.enemy_weapon.value=parseInt(18);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Mace'){
                    document.spy.enemy_weapon.value=parseInt(17);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Scimitar'){
                    document.spy.enemy_weapon.value=parseInt(5);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Broadsword'){
                    document.spy.enemy_weapon.value=parseInt(19);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Steel Bow'){
                    document.spy.enemy_weapon.value=parseInt(20);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Warhammer'){
                    document.spy.enemy_weapon.value=parseInt(21);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Warblade'){
                    document.spy.enemy_weapon.value=parseInt(22);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Heavy Steed'){
                    document.spy.enemy_weapon.value=parseInt(23);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Steed'){
                    document.spy.enemy_weapon.value=parseInt(24);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Hammer of Thor'){
                    document.spy.enemy_weapon.value=parseInt(25);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Warg'){
                    document.spy.enemy_weapon.value=parseInt(26);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Excalibur'){
                    document.spy.enemy_weapon.value=parseInt(27);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Flaming Arrow'){
                    document.spy.enemy_weapon.value=parseInt(28);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Battle Axe'){
                    document.spy.enemy_weapon.value=parseInt(29);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Dragon'){
                    document.spy.enemy_weapon.value=parseInt(30);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Dragon Claw'){
                    document.spy.enemy_weapon.value=parseInt(6);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Blackpowder Missile'){
                    document.spy.enemy_weapon.value=parseInt(70);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Invisibility Shield'){
                    document.spy.enemy_weapon.value=parseInt(71);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Nunchaku'){
                    document.spy.enemy_weapon.value=parseInt(75);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Lookout Tower'){
                    document.spy.enemy_weapon.value=parseInt(74);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Chariot'){
                    document.spy.enemy_weapon.value=parseInt(72);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Dragonskin'){
                    document.spy.enemy_weapon.value=parseInt(51);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Grappling Hook'){
                    document.spy.enemy_weapon.value=parseInt(67);
                }
                if(document.getElementById('fill_weapon').innerHTML == ''){
                    document.spy.enemy_weapon.value=parseInt(69);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Skeleton Key'){
                    document.spy.enemy_weapon.value=parseInt(73);
                }
                if(document.getElementById('fill_weapon').innerHTML == 'Guard Dog'){
                    document.spy.enemy_weapon.value=parseInt(68);
                }

                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));

                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'fakesab' || event.target.id == 'fakesab') {
                document.spy.numsab.value=parseInt(1);
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(69);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_missle' || event.target.id == 'b_missle') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_missle').innerHTML);
                // document.spy.numsab.value= parseInt(GM_getValue("btn_missle")) ;
                //document.spy.sabturns.value=parseInt(1);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(70);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_ch' || event.target.id == 'b_ch') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_ch').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_ch"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(72);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_ishield' || event.target.id == 'b_ishield') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_ishield').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_ishield"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(71);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_skin' || event.target.id == 'b_skin') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_skin').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_skin"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(51);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_nun' || event.target.id == 'b_nun') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_nun').innerHTML);
                // document.spy.numsab.value= parseInt(GM_getValue("btn_nun")) ;
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(75);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_key' || event.target.id == 'b_key') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_key').innerHTML);
                // document.spy.numsab.value= parseInt(GM_getValue("btn_key")) ;
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(73);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_hook' || event.target.id == 'b_hook') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_hook').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_hook"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(67);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_tower' || event.target.id == 'b_tower') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_tower').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_tower"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(74);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_dog' || event.target.id == 'b_dog') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_dog').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_dog"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(68);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_candle' || event.target.id == 'b_candle') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_candle').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_dog"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(62);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'b_rope' || event.target.id == 'b_rope') {
                document.spy.numsab.value=parseInt(document.getElementById('btn_rope').innerHTML);
                // document.spy.numsab.value=parseInt(GM_getValue("btn_dog"));
                //document.spy.sabturns.value=parseInt(5);
                document.spy.numspies.value=parseInt(1);
                document.spy.enemy_weapon.value=parseInt(58);
                GM_setValue(target + '_kocsabselect',parseInt(document.spy.enemy_weapon.selectedIndex));
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                //GM_setValue(target + '_kocsabturns',parseInt(document.spy.sabturns.value));
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'plus_one') {
                document.spy.numsab.value = parseInt(document.spy.numsab.value, 10) + 1;
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'plus_five') {
                document.spy.numsab.value = parseInt(document.spy.numsab.value, 10) + 5;
                GM_setValue(target + '_kocsabnum',parseInt(document.spy.numsab.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'plus_one_spies') {
                document.spy.numspies.value = parseInt(document.spy.numspies.value, 10) + 1;
                GM_setValue(target + '_kocsabspynum',parseInt(document.spy.numspies.value));
                event.stopPropagation();
                event.preventDefault();
            } else if (event.target.name == 'reset_aat') {
                var name = GM_getValue("Koc_User");
                var userid = String(document.URL).substr(String(document.URL).indexOf('=')+1, 7);
                var resetconfirm = confirm("Only BFMods and Admins can use this feature. So if your one of these, do you want to reset?");
                if (resetconfirm == true){
                    ReturnRequest('DeleteAAT.php?id=' + userid + '&name=' + name,0,function(r){
                        window.location.replace("https://www.kingsofchaos.com/stats.php?id="+userid);
                        //alert('worked');
                    });
                } else {
                    //window.location.replace("http://www.kingsofchaos.com/attack.php?id="+userid);
                    alert('Nothing happened!!');
                }
            }
            //document.getElementsByName('reset_aat')
        });

        document.addEventListener('change', function(event) {
            if(event.target.name == 'enemy_weapon'){
                GM_setValue(target + '_kocsabselect',parseInt(event.target.selectedIndex));
                event.stopPropagation();
                event.preventDefault();

            }else if(event.target.name == 'numsab'){
                GM_setValue(target + '_kocsabnum',parseInt(event.target.value));
                event.stopPropagation();
                event.preventDefault();

            }else if(event.target.name == 'sabturns'){
                //GM_setValue(target + '_kocsabturns',parseInt(event.target.value));
                event.stopPropagation();
                event.preventDefault();

            }else if(event.target.name == 'numspies'){
                GM_setValue(target + '_kocsabspynum',parseInt(event.target.value));
                event.stopPropagation();
                event.preventDefault();
            }
        }, true);

        // Reduce sab amount after AAT is too high message
        if ((document.body.innerHTML.indexOf("you will never be able to get away") > 0) && (document.getElementsByName('numsab')[0].value > 0)) {
            //alert('lower aat');
            document.getElementsByName('numsab')[0].value--;
            GM_setValue(target + '_kocsabnum', document.getElementsByName('numsab')[0].value);
        }
        else {
            document.getElementsByName('numsab')[0].value = GM_getValue(target + '_kocsabnum', '1');
        }
        // setTimeout(function(){
        document.getElementsByTagName("select")[0].selectedIndex = GM_getValue(target + '_kocsabselect',"70");

        //var spysab = document.getElementsByTagName("select")[0]
        //spysab.value = GM_getValue(target + '_kocsabselect',"70");
        //spysab.value = GM_setValue(target + '_kocsabselect',parseInt(event.target.selectedIndex));

        var spysab = document.getElementsByName('numspies')[0];
        spysab.value = GM_getValue(target + '_kocsabspynum','1');
        spysab.id = "__sabb";

        //var spysab = document.getElementsByName('sabturns')[0];
        //spysab.value = GM_getValue(target + '_kocsabturns','5');
        //spysab.id = "__xsabb";
        // },60);
        //InStr(stuff,
        var stuff = document.body.innerHTML;
        if (InStr(stuff,'Your opponent has already suffered heavy losses today')){
            var name = FindText(FindText(stuff,'"stats.php?id=',"a>"),">","<");
            ReturnRequest("E_Maxed.php?name="+name,0,function(responseText){
                //alert(name);
            });
        }
    }
    function attackEvent(event){
        if(event.target.name == 'fasterspy'){
            if(GM_getValue("spy") == 1){
                GM_setValue("spy", 0)
            }else{
                GM_setValue("spy", 1)
            }
        }
    }
    function ReBuildMassPage(e){
        var fURL = '';
        var ReportID = 0;
        e.originalTarget.removeAttribute('x       ');
        e.originalTarget.value = 'Mass';
        e.originalTarget.removeEventListener('click', ReBuildMassPage, true);
        e.preventDefault();

        var html = document.body.innerHTML;
        var textarea = '<table border="1" style="border-collapse: collapse" bordercolor="#111111" width="100%" height="104">' +
            ' <tr>' +
            '<td width="50%" height="17">' +
            ' <p align="center">Return values</td>' +
            '</tr>' +
            '<tr>' +
            '<td width="50%" height="59"><div id=tattacks><div id=finalurl></div><div id=sometext></div></td>' +
            ' </tr>' +
            '<tr>' +
            '<td width="50%" height="12">' +
            ' <p align="center">Status</td>' +
            ' </tr>' +
            '<tr>' +
            '<td width="50%" height="11"><div id=rstatus></div></td>' +
            ' </tr>';
        var blah4 = '<td><b>Trained Attack Soldiers</b></td>';
        var blah5 = '</table>';
        var blah6 = '<td><b>Trained Attack Soldiers</b></td>' + FindText(html,blah4,blah5);
        //var newhtml = html.replace(blah6,textarea);
        //document.body.innerHTML = newhtml;
        table = '<table class="table_lines" align="center" width="100%" cellspacing="0" cellpadding="6" border="0">'+
            '<tr><th>Attack result</th></tr>'+
            '<tr><td><div id=tattacks><div id=finalurl></div><div id=sometext></div></td></tr>'+
            '<tr><td><div id=rstatus></div></td></tr>'+
            '</table>';
        var cID = getClassIndex('table_lines','Armory Information');
        if(!String(cID).match('undefined')){
            document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
        }else{
            cID = getClassIndex('table_lines','Personnel');
            if(!String(cID).match('undefined')){
                document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
            }else{
                cID = getClassIndex('table_lines','Recon result');
                if(!String(cID).match('undefined')){
                    document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
                }else{
                    cID = getClassIndex('table_lines','Sab Result');
                    if(!String(cID).match('undefined')){
                        document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
                    }else{
                        alert("Error? o.O (Refresh the page)");
                    }
                }
            }
        }

        document.addEventListener('click', function(event) {
            if(event.target.name == 'attackbut2') {
                alert("test");
                params = 'attackbut=Attack&attacks=1&defender_id=' +
                    +  defenderId
                    + '&turing=' + turing
                    + '&hash=';
                document.getElementById('rstatus').innerHTML = 'Loading';
                //get("http://www.kingsofchaos.com/inteldetail.php?report_id=11233416", function(responseText){
                doSab(params, function(rText) {
                    document.getElementById('rstatus').innerHTML = "Processing\n";
                    rText = rText.split('*****');
                    fURL = rText[1];
                    responseText = rText[0];
                    totalAttacks = Math.max(totalAttacks + 1);
                    document.getElementById('finalurl').innerHTML = 'Total Attacks: ' + totalAttacks + ' <a href="' + fURL + '"> View full report</a>';;
                    ReportID = String(fURL).substr(String(fURL).indexOf('=')+1, 8);
                    //	document.body.innerHTML = document.body.innerHTML + responseText;
                    if(InStr(responseText,'ou stole') == true){
                        // Good Attack

                        var whoami = GM_getValue("Koc_User");
                        var Attackee = FindText(FindText(responseText,' gold from ','!'),">","<");
                        var sGold = FindText(FindText(responseText,'ou stole ','gold from'),">","<");
                        ReturnRequest('E_Log.php?type=attack&attacker=' + whoami + '&attackee=' + Attackee + '&gold=' + sGold + '&rid=' + ReportID,0,function(responseText){ })
                        document.getElementById('sometext').innerHTML = "Good attack \n Gold Stolen: " + sGold;

                    }else if(InStr(responseText,'only 10 times in 24 hours') == true)
                    {
                        document.getElementById('rstatus').innerHTML = "You've attacked this person 10 times.\n";
                    }else if(InStr(responseText,'retreated') == true)
                    {
                        document.getElementById('rstatus').innerHTML = "Attack retreated...\n";
                    }else{
                        document.getElementById('rstatus').innerHTML = "Attack Defended\n";
                    }

                    getTuring(defenderId, function(s) {
                        document.getElementById('rstatus').innerHTML = document.getElementById('rstatus').innerHTML + "Attack Finished.";
                    });
                });
                event.preventDefault();
            }
        }, true);
    }

    function ReBuildSpyPage(e){
        var fURL = '';
        var ReportID = 0;
        e.originalTarget.removeAttribute('x       ');
        e.originalTarget.value = 'Spy [r]';
        e.originalTarget.removeEventListener('click', ReBuildSpyPage, true);
        e.preventDefault();

        var html = document.body.innerHTML;
        var textarea = '<table border="1" style="border-collapse: collapse" bordercolor="#111111" width="100%" height="104">' +
            ' <tr>' +
            '<td width="50%" height="17">' +
            ' <p align="center">Return values</td>' +
            '</tr>' +
            '<tr>' +
            '<td width="50%" height="59"><div id=finalurl></div><div id=sometext></div></td>' +
            ' </tr>' +
            '<tr>' +
            '<td width="50%" height="12">' +
            ' <p align="center">Status</td>' +
            ' </tr>' +
            '<tr>' +
            '<td width="50%" height="11"><div id=rstatus></div></td>' +
            ' </tr>';
        var blah4 = '<td><b>Trained Attack Soldiers</b></td>';
        var blah5 = '</table>';
        var blah6 = '<td><b>Trained Attack Soldiers</b></td>' + FindText(html,blah4,blah5);
        //var newhtml = html.replace(blah6,textarea);
        //document.body.innerHTML = newhtml;
        table = '<table class="table_lines" align="center" width="100%" cellspacing="0" cellpadding="6" border="0">'+
            '<tr><th>Recon result</th></tr>'+
            '<tr><td><div id=finalurl></div><div id=sometext></div></td></tr>'+
            '<tr><td><div id=rstatus></div></td></tr>'+
            '</table>';
        var cID = getClassIndex('table_lines','Armory Information');
        if(!String(cID).match('undefined')){
            document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
        }else{
            cID = getClassIndex('table_lines','Personnel');
            if(!String(cID).match('undefined')){
                document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
            }else{
                cID = getClassIndex('table_lines','Sab Result');
                if(!String(cID).match('undefined')){
                    document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
                }else{
                    cID = getClassIndex('table_lines','Attack result');
                    if(!String(cID).match('undefined')){
                        document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
                    }else{
                        alert("Error? o.O (Refresh the page)");
                    }
                }
            }
        }
        document.addEventListener('click', function(event) {
            if(event.target.name == 'spyrbut2') {
                params = 'mission_type=recon&defender_id=' +
                    +  defenderId
                    + '&turing=' + turing
                    + '&hash=';
                document.getElementById('rstatus').innerHTML = 'Loading';
                //get("http://www.kingsofchaos.com/inteldetail.php?report_id=11233416", function(responseText){
                doSab(params, function(rText) {
                    document.getElementById('rstatus').innerHTML = "Processing";
                    rText = rText.split('*****');
                    fURL = rText[1];
                    responseText = rText[0];
                    document.getElementById('finalurl').innerHTML = '<a href="' + fURL + '">View full report</a>';;
                    ReportID = String(fURL).substr(String(fURL).indexOf('=')+1, 8);
                    //	document.body.innerHTML = document.body.innerHTML + responseText;
                    if(InStr(responseText,'spy moves stealthily through') == true){
                        // Good Recon
                        Username = FindText(responseText,"Under the cover of night, your spy sneaks into ","'s camp.");
                        alert(Username);
                        Strike = FindText(FindText(responseText,"<td>Strike Action:</td>","</tr>"),">","</");
                        Defence = FindText(FindText(responseText,"<td>Defensive Action</td>","</tr>"),">","</");
                        TheSpy = FindText(FindText(responseText,"<td>Spy Rating</td>","</tr>"),">","</");
                        TheSentry = FindText(FindText(responseText,"<td>Sentry Rating</td>","</tr>"),">","</");
                        NumberOfCoverts = FindText(FindText(responseText,"<td>Covert Operatives:</td>","</tr>"),">","</");
                        UsersGold = FindText(FindText(responseText,"Treasury","</td>"),'">'," Gold");
                        StatsID = FindText(responseText,'"id" value="','"');
                        //alert(UsersGold);
                        var whoami = GM_getValue("Koc_User");
                        MakeRequestNoMsg('E_Recon.php?user=\n' + Username + '&sa=\n' + Strike + '&da=\n' + Defence + '&spy=\n' + TheSpy  + '&sentry=\n' + TheSentry + '&statsid=\n' + StatsID + '&gold=\n' + UsersGold + '&coverts=\n' + NumberOfCoverts + '&u=\n' + whoami + '&rid=' + ReportID);
                        if(CheckStat(Strike) == true) { sSA = "Strike: " + Strike; }
                        if(CheckStat(Defence) == true) { sDA = "Defence: " + Defence; }
                        if(CheckStat(TheSpy) == true) { sSpy = "Spy: " + TheSpy; }
                        if(CheckStat(TheSentry) == true) { sSentry = "Sentry: " + TheSentry; }
                        if(CheckStat(NumberOfCoverts) == true) { sCoverts = "Coverts: " + NumberOfCoverts; }
                        statString = sSA + '\n' + sDA + '\n' + sSpy + '\n' + sSentry + '\nGold: ' + UsersGold;
                        statString = statString + '\n' + sCoverts
                        WeaponTable = FindText(responseText,'<tr><th colspan="4">Weapons</th></tr>','<form method="get" action="attack.php">');
                        usetgold = "[user]" + Username + "[/user]";
                        wRow = WeaponTable.split('<tr>');
                        for(i=1;i<WeaponTable.length;i++){
                            if(InStr(wRow[i],'td align="right">') == true){
                                cWeap = wRow[i].split('align="right">');
                                type = FindText(cWeap[1],'','</td>');
                                qu = FindText(cWeap[2],'','</td>');
                                st = FindText(cWeap[3],'','</td>');
                                weap = FindText(wRow[i],"<td>","</td>");

                                if (qu != "???"){
                                    usetgold = usetgold + "[weap]--w=" + weap + "--q=" + qu + " + --s=" + st + "--x[/weap]"

                                    if((WeaponFromStrength(st) == 'IS') || (WeaponFromName(weap) == 'IS')) {
                                        sIS = "IS: " + qu + ' (' + strengthIS + ' )';
                                    }else if((WeaponFromStrength(st) == 'NUN') || (WeaponFromName(weap) == 'NUN')){
                                        sNUN = "NUN: " + qu;
                                    }else if((WeaponFromStrength(st) == 'BPM') || (WeaponFromName(weap) == 'BPM')){
                                        sBPM = "BPM: " + qu + ' (' + strengthBPM + ' )';
                                    }else if((WeaponFromStrength(st) == 'LT') || (WeaponFromName(weap) == 'LT')){
                                        sLT = "LT: " + qu;
                                    }else if((WeaponFromStrength(st) == 'LT') || (WeaponFromName(weap) == 'Skins')){
                                        sDS = "Skins: " + qu;
                                    }else if((WeaponFromStrength(st) == 'LT') || (WeaponFromName(weap) == 'Chariots')){
                                        sCH = "Chariots: " + qu;
                                    }
                                    document.getElementById('rstatus').innerHTML = '';
                                }
                            }
                        }
                        usetgold = usetgold  + "end";
                        //alert(usetgold);
                        MakeRequestNoMsg('E_AATRecon.php?list=\n' + usetgold);
                        //		document.getElementById('rstatus').innerHTML = 'Loaded';
                        statString = statString + '\n' + sBPM + '\n' + sCH + '\n' + sIS + '\n' + sDS +'\n' + sNUN + '\n' + sLT;
                        document.getElementById('sometext').innerHTML = replaceAll(statString,"\n","<br>");

                    }else if(InStr(responseText,'only 15 times in 24 hours') == true){
                        document.getElementById('rstatus').innerHTML = "You've recon'd this person 15 times.\n";
                    }else if(InStr(responseText,'one of the sentries spots him') == true){
                        document.getElementById('rstatus').innerHTML = "Recon Failed.\n";
                    }
                    getTuring(defenderId, function(s) {
                        document.getElementById('rstatus').innerHTML = document.getElementById('rstatus').innerHTML + "Recon Finished.";
                    })
                })
                event.preventDefault();
            }
        }, true);
    }
    function CheckStat(stat){
        if(stat == '???') {
            return false
        }else{
            return true
        }
    }

    // function ReBuildPage(e)
    // {
    // alert("started");
    // e.originalTarget.removeAttribute('x       ');
    // e.originalTarget.value = 'Sabotage';   //BACKER  removed [s] from label
    // e.originalTarget.removeEventListener('click', ReBuildPage, true);
    // e.preventDefault();

    // var html = document.body.innerHTML;


    // var whoami = GM_getValue("Koc_User");
    // var userid = String(document.URL).substr(String(document.URL).indexOf('=')+1, 7);
    // table = '<table class="table_lines" align="center" width="100%" cellspacing="0" cellpadding="6" border="0">'+
    // '<tr><th>Sab Result</th></tr>'+
    // '<tr><td><div id=chuck></div><br><div id=sometext></div><div id=sabmsg></div></td></tr>'+
    // '<tr><td><textarea name="sabresults" id="sabresults" COLS=50 ROWS=15 width="10px"></TEXTAREA></td></tr>'+
    // '</table>';
    // var cID = getClassIndex('table_lines','Armory Information');
    // if(!String(cID).match('undefined')){
    // document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
    // }else{
    // cID = getClassIndex('table_lines','Personnel');
    // if(!String(cID).match('undefined')){
    // document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
    // }else{
    // cID = getClassIndex('table_lines','Recon result');
    // if(!String(cID).match('undefined')){
    // document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
    // }else{
    // cID = getClassIndex('table_lines','Attack result');
    // if(!String(cID).match('undefined')){
    // document.getElementsByClassName('table_lines')[cID].innerHTML = table; //"Lol";
    // }else{
    // alert("Error? o.O (Refresh the page)");
    // }
    // }
    // }
    // }


    // alert("started");
    // //Start Niels Code
    // try {
    // var form = {
    // weapon: document.evaluate("//select[@name='enemy_weapon']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0),
    // qty: document.evaluate("//input[@name='numsab']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0),
    // spies: document.evaluate("//input[@name='numspies']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0),
    // turns: document.evaluate("//select[@name='sabturns']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0)
    // //defenderId: document.evaluate("//input[@name='defender_id']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).value,
    // };
    // }    catch (e) {
    // alert("o_O");
    // return;
    // }


    // form.turns.value = 5;
    // form.weapon.selectedIndex = GM_getValue('kocsabbselect',"0");
    // form.qty.value = GM_getValue('kocsabbnum',"0");


    // document.addEventListener('click', function(event) {

    // if(event.target.name == 'spybut2') //A sab.
    // {
    // //GetElement("input", "Sabotage [s]").disabled = true;
    // GetElement("input", "Sabotage").style = "font-style:italic;";
    // //for(i=1;i<10;i++){

    // params = 'mission_type=sabotage&enemy_weapon=' + form.weapon.value
    // + '&numsab=' + form.qty.value
    // + '&numspies=' + form.spies.value
    // + '&sabturns=' + form.turns.value
    // + '&defender_id=' + defenderId
    // + '&turing=' + turing

    // document.getElementById('sometext').innerHTML = "Please Wait..."

    // doSab(params, function(responseText) {
    // responseText = responseText + "<title>Lol</title>"
    // try {

    // var pos;


    // //responseText
    // if(InStr(responseText,' of Nunchaku')==true)
    // {
    // iNunLost += parseInt(FindText(responseText,"<li> "," of Nunchaku"));
    // nunLost(whoami,parseInt(FindText(responseText,"<li> "," of Nunchaku")))
    // }

    // document.getElementById('sabmsg').innerHTML = "Nunchakus Lost: " + iNunLost + '     Failed Sabs: ' + iFailedSab;

    // if ((pos = responseText.indexOf('<h3>Covert Mission Report</h3>')) > 0) {
    // var extra = '';
    // pos = responseText.substr(pos + 30);
    // pos = pos.substr(0, pos.indexOf('<form'));
    // if (pos.match(/weapons of type \./)) {
    // form.qty.value = 0;
    // extra = '<div style="color:#f63">Choose another weapon / tool!</div>';
    // //alert("GM_WeaponOut.php?user=" + gUser + "&w=" + FindText(form.weapon.innerHTML,form.weapon.value+'">','<'));
    // returnRequest("GM_WeaponOut.php?user=" + gUser + "&w=" + FindText(form.weapon.innerHTML,form.weapon.value+'">','<'));
    // document.getElementById('sometext').innerHTML += '<div style="color:#f63">Choose another weapon / tool!</div>';
    // } else if (pos.match(/undetected,\s+and destroy/)) {
    // document.getElementById('sabresults').innerHTML += pos.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').replace(/^\s*/, '').replace(/\s*$/, '').replace(/^[\s\S]*(Your spies successfully)/, "$1") + "\n";
    // } else {
    // iFailedSab += 1;
    // document.getElementById('sabmsg').innerHTML = "Nunchakus Lost: " + iNunLost + '     Failed Sabs: ' + iFailedSab;
    // }
    // document.getElementById('sometext').innerHTML = pos + extra;
    // } else if ((pos = responseText.indexOf('<font color="red">')) > 0) {
    // pos = responseText.substr(pos + 18);
    // document.getElementById('sometext').innerHTML += '<br>' + pos.substr(0, pos.indexOf('</font>'));
    // if (responseText.match(/Your opponent has already suffered heavy losses today/)) {
    // returnRequest("GM_Maxed.php?id="+userid);
    // }
    // if (responseText.match(/Your officers inform you that you will never be able to get away with sabotaging that much of an opponent's armory\./)) { //'
    // var origQty = parseInt(String(form.qty.value).replace(/,/g, ''));
    // var newQty = Math.max(0, origQty - 1);
    // if (newQty != origQty) {
    // form.qty.value = newQty;
    // document.getElementById('sometext').innerHTML += '<div style="color:#ff3">The quantity has been lowered for you from ' + origQty + ' to ' + form.qty.value + '.</div>';
    // } else {
    // //alert("GM_SelfUpdate.php?user=" + gUser + "&w=" + FindText(form.weapon.innerHTML,form.weapon.value+'">','<'));
    // //MakeRequestNoMsg("GM_SelfUpdate.php?user=" + gUser + "&w=" + FindText(form.weapon.innerHTML,form.weapon.value+'">','<'));
    // document.getElementById('sometext').innerHTML += '<div style="color:#f63">Choose another weapon / tool!</div>';
    // }
    // }
    // } else {
    // document.getElementById('sometext').innerHTML = 'O_o';
    // }
    // }
    // catch (e) {
    // document.getElementById('sometext').innerHTML = e;
    // }
    // alert("started");
    // getTuring(defenderId, function(s) {
    // document.getElementById('sometext').innerHTML += "<br>Sab Finished.";
    // GetElement("input", "Sabotage").disabled = false;   //BACKER  removed [s] from label
    // GetElement("input", "Sabotage").style = "font-style:normal;";   //BACKER  removed [s] from label
    // if (!document.getElementById('sabmsg')) { document.getElementById('sometext').innerHTML = "<br><b>uh oh, this broke and you need to reload..."; window.location.reload(); }
    // });
    // })
    // event.preventDefault();
    // event.originalTarget.value = 'Sabotage';  //BACKER  removed [s] from label
    // }
    // }, true);
    // }
    function nunLost(u,a){
        ReturnRequest('E_Log.php?type=nun&rid=0&sabber=' + u + '&a=' + a,0,function(responseText){
            //alert(responseText);
        })
    }


    //function securityFunc(){
    //StopLoading();
    //get("http://www.kingsofchaos.com/security.php", function(responseText){
    //var securityhash = FindText(responseText,"http://api.recaptcha.net/noscript?k=",'" height="300"');
    //get("http://api.recaptcha.net/challenge?k=" +  securityhash, function(html){
    //var challenge  = FindText(html,"challenge : '","',")
    //var newhtml = '<img src="http://api.recaptcha.net/image?c=' + challenge + '">'
    //newhtml += '<br><input type=text name=recaptcha_response_field value="">'
    //newhtml +='<br><input type=hidden name=recaptcha_challenge_field value="' + challenge + '">'
    //newhtml +='<br><centre><input type=submit name="RaWr" value="Go go go"></centre>'
    //Loading(newhtml);
    //})
    //})
    //}

    function doSab(data,cb){
        GM_xmlhttpRequest({
            method: "POST",
            url: 'https://www.kingsofchaos.com/attack.php',
            headers:{'Content-type':'application/x-www-form-urlencoded'},
            data:encodeURI(data),
            onload: function(xhr) {
                //YF9gz8Ho73
                if(InStr(data,"=recon") == true){
                    cb(xhr.responseText + '*****' + xhr.finalUrl);
                }else if(InStr(data,"attacks=") == true){
                    cb(xhr.responseText + '*****DEMMIE' + xhr.finalUrl);
                }else{
                    cb(xhr.responseText);
                    LogSab(xhr.responseText,xhr.finalUrl);
                }
            }
        });
    }
    function doRecon(data,cb){
        GM_xmlhttpRequest({
            method: "POST",
            url: 'https://www.kingsofchaos.com/attack.php',
            headers:{'Content-type':'application/x-www-form-urlencoded'},
            data:encodeURI(data),
            onload: function(xhr) {
                cb(xhr.responseText);
            }
        });
    }
    function LogSab(data,url){
        var ReportID = String(url).substr(String(url).indexOf('=')+1, 8);
        if(InStr(data,'Your spies successfully enter ') == true){
            var sabbee = FindText(data,"Your spies successfully enter ","'s");
            var amount = FindText(data,"and destroy ","of the ");
            var weapon = FindText(data,"of the enemy's ","stockpile.");
            var whoami = GM_getValue("Koc_User");
            //alert('GM_Log.php?type=sab&sabber=' + whoami + '&sabbee=' + sabbee + '&weapon=' + weapon + '&amount=' + amount + '&rid=' + ReportID);
            ReturnRequest('E_Log.php?type=sab&sabber=' + whoami + '&sabbee=' + sabbee + '&weapon=' + weapon + '&amount=' + amount + '&rid=' + ReportID,0,function(responseText){
                //alert();
                document.getElementById('chuck').innerHTML = '<b><font color="yellow">' + FindText(responseText,'<chuck>','</chuck>') + '</b></font><br>';
            })
        }
    }
    function doSecurity(data,cb){
        GM_xmlhttpRequest({
            method: "POST",
            url: 'https://www.kingsofchaos.com/security.php',
            headers:{'Content-type':'application/x-www-form-urlencoded'},
            data:encodeURI(data),
            onload: function(xhr) { cb(xhr.responseText); }
        });
    }
    function getTuring(id, cb) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://www.kingsofchaos.com/attack.php?id=" + id,
            onload: function(xhr) {
                turing = FindText(xhr.responseText,'name="turing" value="','"');
                cb(turing);
            }
        });
    }
    function replaceAll( str, from, to ) {
        var idx = str.indexOf( from );
        //alert("idx 1: "+idx);
        while ( idx > -1 ) {
            str = str.replace( from, to );
            idx = str.indexOf( from );
            //alert("idx 2: "+idx);
        }
        return str;
    }
    ////  None KoC Functions.
    function create_SALTOptionsDiv() {
        var Xpos = 350;var Ypos = 25;
        if (GM_getValue("SALToptionsDivX",-1) != -1) Xpos = GM_getValue("SALToptionsDivX",300);
        if (GM_getValue("SALToptionsDivY",-1) != -1) Ypos = GM_getValue("SALToptionsDivY",300);
        var c1 = '';
        if (GM_getValue("RL_SALThide1",0) == 1) c1 = 'checked';
        var c2 = '';
        if (GM_getValue("RL_SALThide2",0) == 1) c2 = 'checked';
        var c3 = '';
        if (GM_getValue("RL_SALThide3",0) == 1) c3 = 'checked';
        var c4 = '';
        if (GM_getValue("RL_SALThide4",0) == 1) c4 = 'checked';
        var c5 = '';
        if (GM_getValue("RL_SALThide5",0) == 1) c5 = 'checked';
        var c6 = '';
        if (GM_getValue("RL_SALThide6",0) == 1) c6 = 'checked';
        makediv('SALToptionsDiv',1,0,0,Xpos,Ypos,'#000000','&nbsp;Strategic Alliance Lashing Tool Options&nbsp;');
        var newHTML =  '<table cellpadding="2" cellspacing="0">';
        newHTML +='<tr>';
        newHTML +='<td colspan="2"><h4><p style="text-align:center;color:red;">Salt removal options. Just add a check to the option for it to do what it says. And then click (Exit) to save.</p></h4></td>';
        newHTML += '</tr>';

        newHTML +='<tr>';
        newHTML +='<td>1. ';
        newHTML +=  '<input type="checkbox" id="hideStuff1" '+c1+'>';
        newHTML += '</td>';
        newHTML +='<td>';
        newHTML +=  'Do not show extra buy button on the armory page.';
        newHTML += '</td>';
        newHTML += '</tr>';
        newHTML +='<tr>';
        newHTML +='<td id="brokendisabled">2. ';
        newHTML +=  '<input type="checkbox" id="hideStuff2" onClick="this.disabled=true;return false;" '+c2+'>';
        newHTML += '</td>';

        //var dont = alert("Told you this was broken, so why click it!!!");
        newHTML +='<td>';
        newHTML +=  'Do not show the sell off all button. (<font color="yellow">This feature is disabled and broken atm</font>)';
        newHTML += '</td>';
        newHTML += '</tr>';
        newHTML +='<tr>';
        newHTML +='<td>3. ';
        newHTML +=  '<input type="checkbox" id="hideStuff3" '+c3+'>';
        newHTML += '</td>';
        newHTML +='<td>';
        newHTML +=  'Do not show the next tech amount in the gold box.';
        newHTML += '</td>';
        newHTML += '</tr>';
        newHTML +='<tr>';
        newHTML +='<td>4. ';
        newHTML +=  '<input type="checkbox" id="hideStuff4" '+c4+'>';
        newHTML += '</td>';
        newHTML +='<td>';
        newHTML +=  'Do not show the my warlist tab.';
        newHTML += '</td>';
        newHTML += '</tr>';
        newHTML +='<tr>';
        newHTML +='<td>5. ';
        newHTML +=  '<input type="checkbox" id="hideStuff5" '+c5+'>';
        newHTML += '</td>';
        newHTML +='<td>';
        newHTML +=  'Do not show the recon request button on the stats page.';
        newHTML += '</td>';
        newHTML += '</tr>';
        newHTML +='<tr>';
        newHTML +='<td>6. ';
        newHTML +=  '<input type="checkbox" id="hideStuff6" '+c6+'>';
        newHTML += '</td>';
        newHTML +='<td>';
        newHTML +=  'Remove all the extra info under the Sabotage Mission table on the attack/sab page.(<font color="yellow">Makes that section normal</font>)';
        newHTML += '</td>';
        newHTML += '</tr>';
        newHTML +='<tr>';
        newHTML += '<td></td>';//msg_showChangeLog
        newHTML += '</tr>';//newCell.addEventListener('click',function(e) {myWarList();},true);
        newHTML +='<tr>';
        newHTML +='<td colspan="2"><p style="text-align:center;color:yellow;"><font color="orangered"><b>NOTE: </b></font>The last 2(number 5 and number 6) MIGHT cause a jump or a lag in the page if used.</p></td>';
        newHTML += '</tr>';
        newHTML += '</table>';
        document.getElementById("content_SALToptionsDiv").innerHTML = newHTML;
        document.getElementById("brokendisabled").addEventListener("click",function(e) {
            alert("Told you this was broken, so why click it!!!");
        },false);

        document.getElementById("hideStuff1").addEventListener("change",function(e) {
            var status = 0;
            if (e.target.checked) status = 1;
            GM_setValue("RL_SALThide1",status);
        },false);
        document.getElementById("hideStuff2").addEventListener("change",function(e) {
            var status = 0;
            if (e.target.checked) status = 1;
            GM_setValue("RL_SALThide2",status);
        },false);
        document.getElementById("hideStuff3").addEventListener("change",function(e) {
            var status = 0;
            if (e.target.checked) status = 1;
            GM_setValue("RL_SALThide3",status);
        },false);
        document.getElementById("hideStuff4").addEventListener("change",function(e) {
            var status = 0;
            if (e.target.checked) status = 1;
            GM_setValue("RL_SALThide4",status);
        },false);
        document.getElementById("hideStuff5").addEventListener("change",function(e) {
            var status = 0;
            if (e.target.checked) status = 1;
            GM_setValue("RL_SALThide5",status);
        },false);
        document.getElementById("hideStuff6").addEventListener("change",function(e) {
            var status = 0;
            if (e.target.checked) status = 1;
            GM_setValue("RL_SALThide6",status);
        },false);
    }
    function economyTBG(econ){
        switch(econ){
            case 'Hunting': { return '150'; break}
            case 'Farming': { return '450'; break}
            case 'Fishing': { return '900'; break}
            case 'Mining': { return '2400'; break}
            case 'Construction': { return '5850'; break}
            case 'Feudal': { return '14700'; break}
            case 'Trade': { return '36600'; break}
            case 'Exploration': { return '91500'; break}
            case 'Imperial': { return '228900'; break}
            case 'Mercantile': { return '0'; break}
            case 'Plantation': { return '0'; break}
            case 'Industrial': { return '0'; break}
            default: { return '0'; break}
        }
    }
    function DisplayMessage(message){
        var gm_button=document.createElement('div');
        gm_button.setAttribute('name','gm-button');
        gm_button.setAttribute('id','gm-button');
        gm_button.setAttribute('scrolling', 'yes');
        gm_button.contentDocument && gm_button.contentDocument.body && (gm_button.contentDocument.body.scroll = 'yes');
        gm_button.setAttribute('style','overflow:auto;position:fixed;bottom:10px;right:10px;background-color:#A9A9A9;border:1px solid #FFFFFF;padding:5px;text-align:center;');
        var gm_paragraph=document.createElement('p');
        gm_paragraph.setAttribute('id','GM_Message');
        gm_paragraph.setAttribute('style','overflow:auto;font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#000000;text-decoration:none;margin:0;padding:0;');
        gm_paragraph.setAttribute('scrolling', 'auto');
        gm_paragraph.innerHTML = message;

        var gm_span_1=document.createElement('span');
        gm_span_1.setAttribute('id','gm-span-1');
        gm_span_1.setAttribute('scrolling', 'auto');
        gm_span_1.setAttribute('style','cursor:pointer;overflow:auto;');

        document.getElementsByTagName('body')[0].appendChild(gm_button);
        gm_button.appendChild(gm_paragraph);
        gm_paragraph.appendChild(gm_span_1);
    }
    function DisplayWarlist(message){
        var gm_button = document.getElementById("GM_Warlist");
        if(gm_button){
            gm_button.innerHTML = message;
        }else{
            //responseText.setAttribute('style', 'opacity:0.4;border-radius: 150px;-webkit-border-radius: 150px;-moz-border-radius: 150px;');
            //border-radius: 100px; //-webkit-border-radius: 200px;-moz-border-radius: 200px;
            //text-decoration:none;margin:0;padding:0;
            var gm_button=document.createElement('div');
            gm_button.setAttribute('name','gm-button');
            gm_button.setAttribute('id','gm-button');
            gm_button.setAttribute('style','opacity:0.9;-webkit-border-radius: 10px;-moz-border-radius: 10px;position:fixed;top:100px;left:100px;background-color:#2c3e50;border:2px solid #FFFFFF;padding:10px;text-align:right;');
            var gm_paragraph=document.createElement('p');
            gm_paragraph.setAttribute('id','GM_Warlist');
            gm_paragraph.setAttribute('style','font:normal normal normal 15px Arial,Helvetica,sans-serif;color:#FFFF00;text-decoration:none;margin:0;padding:0;');
            gm_paragraph.innerHTML = message;

            var gm_span_1=document.createElement('span');
            gm_span_1.setAttribute('id','gm-span-1');
            gm_span_1.setAttribute('style','cursor:pointer;');

            var u_stats = document.getElementsByTagName('body')[0].appendChild(gm_button);
            gm_button.appendChild(gm_paragraph);
            gm_paragraph.appendChild(gm_span_1);
            var elementPosition = [0,0];
            var mousePosition   = [0,0];
            var element         = document.getElementById('yourElement');

            var mainEH = function (event) {
                mousePosition = [event.clientX, event.clientY];
                document.addEventListener('mousemove', calcEH);
                document.addEventListener('mouseup', removeHandlers);
                document.addEventListener('contextmenu', removeHandlers);
            };

            var calcEH = function (event) {
                var vector      = [-mousePosition[0] + event.clientX, -mousePosition[1] + event.clientY];
                mousePosition   = [mousePosition[0] + vector[0], mousePosition[1] + vector[1]];
                elementPosition = [elementPosition[0] + vector[0], elementPosition[1] + vector[1]];
                updatePosition();
            };

            var removeHandlers = function () {
                document.removeEventListener('mousemove', calcEH);
                document.removeEventListener('mouseup', removeHandlers);
                document.removeEventListener('contextmenu', removeHandlers);
            };

            function updatePosition() {
                u_stats.style.left = elementPosition[0] + "px";
                u_stats.style.top  = elementPosition[1] + "px";
            }

            u_stats.addEventListener('mousedown', mainEH, true);
            // Get the modal
            var modal = document.getElementById('exit');

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    }
    function DisplayMessage2(message){
        var gm_button = document.getElementById("GM_Message2");
        if(gm_button){
            gm_button.innerHTML = message;
        }else{
            //responseText.setAttribute('style', 'opacity:0.4;border-radius: 150px;-webkit-border-radius: 150px;-moz-border-radius: 150px;');
            //border-radius: 100px; //-webkit-border-radius: 200px;-moz-border-radius: 200px;
            //text-decoration:none;margin:0;padding:0;

            var gm_button=document.createElement('div');
            gm_button.setAttribute('name','gm-button');
            gm_button.setAttribute('id','gm-button');
            gm_button.setAttribute('style','opacity:0.7;-webkit-border-radius: 10px;-moz-border-radius: 10px;position:fixed;top:100px;right:25px;background-color:#2c3e50;border:1px solid #FFFFFF;padding:10px;text-align:right;');
            var gm_paragraph=document.createElement('p');
            gm_paragraph.setAttribute('id','GM_Message2');
            gm_paragraph.setAttribute('style','font:normal normal normal 15px Arial,Helvetica,sans-serif;color:#FFFF00;text-decoration:none;margin:0;padding:0;');
            gm_paragraph.innerHTML = message;

            var gm_span_1=document.createElement('span');
            gm_span_1.setAttribute('id','gm-span-1');
            gm_span_1.setAttribute('style','cursor:pointer;');

            var u_stats = document.getElementsByTagName('body')[0].appendChild(gm_button);
            gm_button.appendChild(gm_paragraph);
            gm_paragraph.appendChild(gm_span_1);
            //var remStats = document.body.removeChild(u_stats);
            //document.getElementById("gm_button").addEventListener('click', doBuyBut, true);
            //alert("You pressed button: " + u_stats.event)
            removed = false;
            document.addEventListener("click", function(event){
                //event.preventDefault();
                if (removed) return;

                document.body.removeChild(u_stats);
                removed = true;
            });

        }
    }
    function armoryDisplay(message){
        var gm_button = document.getElementById("GM_Message2");
        if(gm_button){
            gm_button.innerHTML = message;
        }else{
            //responseText.setAttribute('style', 'opacity:0.4;border-radius: 150px;-webkit-border-radius: 150px;-moz-border-radius: 150px;');
            //border-radius: 100px; //-webkit-border-radius: 200px;-moz-border-radius: 200px;
            //text-decoration:none;margin:0;padding:0;
            var gm_button=document.createElement('div');
            gm_button.setAttribute('name','gm-button');
            gm_button.setAttribute('id','gm-button');
            gm_button.setAttribute('style','opacity:0.7;-webkit-border-radius: 10px;-moz-border-radius: 10px;position:fixed;top:65px;right:25px;background-color:#2c3e50;border:1px solid #FFFFFF;padding:10px;text-align:right;');
            var gm_paragraph=document.createElement('p');
            gm_paragraph.setAttribute('id','GM_Message2');
            gm_paragraph.setAttribute('style','font:normal normal normal 15px Arial,Helvetica,sans-serif;color:#FFFF00;text-decoration:none;margin:0;padding:0;');
            gm_paragraph.innerHTML = message;

            var gm_span_1=document.createElement('span');
            gm_span_1.setAttribute('id','gm-span-1');
            gm_span_1.setAttribute('style','cursor:pointer;');

            document.getElementsByTagName('body')[0].appendChild(gm_button);
            gm_button.appendChild(gm_paragraph);
            gm_paragraph.appendChild(gm_span_1);
            /*document.addEventListener("click", function(event){
            document.body.removeChild(u_stats);
        });
        closediv(u_stats);*/
        }
    }
    function DisplayMessage3(message){
        var gm_button = document.getElementById("GM_Message3");
        if(gm_button){
            gm_button.innerHTML = message;
        }else{

            var gm_button=document.createElement('div');
            gm_button.setAttribute('name','gm-button');
            gm_button.setAttribute('id','gm-button');
            gm_button.setAttribute('style','position:fixed;overflow:scroll;height:75%;top:50px;right:10px;background-color:#000000;border:1px solid #FF0000;padding:5px;text-align:center;');
            var gm_paragraph=document.createElement('p');
            gm_paragraph.setAttribute('id','GM_Message3');
            gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;margin:0;padding:0;');
            gm_paragraph.innerHTML = message;

            var gm_span_1=document.createElement('span');
            gm_span_1.setAttribute('id','gm-span-1');
            gm_span_1.setAttribute('style','cursor:pointer;');
            setTimeout(function(){
                var insertedgm3=document.getElementsByTagName('body')[0].appendChild(gm_button);
                gm_button.appendChild(gm_paragraph);
                gm_paragraph.appendChild(gm_span_1);
                document.addEventListener("click", function(event){
                    document.body.removeChild(insertedgm3);
                });
            }, 300);
        }
    }
    //May remove and do in css, above in the stats function
    function DisplayHistory(message){
        var gm_button = document.getElementById("GM_DispMessage");
        if(gm_button){
            gm_button.innerHTML = message;
        }else{
            var gm_button=document.createElement('div');
            gm_button.setAttribute('name','gm-button');
            gm_button.setAttribute('id','gm-button');
            gm_button.setAttribute('style','position:fixed;overflow:scroll;top:50%;left:35%;right:0%;bottom:10%;background-color:#000000;border:1px solid #FF0000;padding:5px;text-align:center;');
            var gm_paragraph=document.createElement('p');
            gm_paragraph.setAttribute('id','GM_DispMessage');
            gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#FFFFFF;text-decoration:none;margin:0;padding:0;');
            gm_paragraph.innerHTML = message;

            var gm_span_2=document.createElement('span');
            gm_span_2.setAttribute('id','gm-span-2');
            gm_span_2.setAttribute('style','cursor:pointer;');


            var insertedgm3=document.getElementsByTagName('body')[0].appendChild(gm_button);
            gm_button.appendChild(gm_paragraph);
            gm_paragraph.appendChild(gm_span_2);
            setTimeout(function(){
                document.addEventListener("click", function(event){
                    document.body.removeChild(insertedgm3);
                });
            }, 300);
        }
    }
    function GetRequest(nourl, cb) {
        GM_xmlhttpRequest({
            method: "GET",
            url: nourl,
            onload: function(xhr) {
                cb(xhr.responseText);
            }
        });
    }
    function MakeRequest(url){
        GM_xmlhttpRequest({
            method: 'GET',
            url: GM_getValue("serverURL")+'/script/backend/\n' + url,
            onload: function(responseDetails) {
                //console.log(url);
                DisplayMessage("Data Collected");
            },
            onerror: function(responseDetails) {
                console.log("Request for contact resulted in error code: " + responseDetails.status);
            }
        });
    }
    function MakeRequestNoMsg(url){
        GM_xmlhttpRequest({
            method: 'GET',
            url: GM_getValue("serverURL") + '/script/backend/\n' + url,
            onload: function(responseDetails) {
                //alert(responseDetails.responseText);
            },
            onerror: function(responseDetails) {
                //alert("Request for contact resulted in error code: " + responseDetails.status);
            }
        });
    }
    function ReturnRequest(url,msg,cb){
        //var serverURL = domain('/script/backend/');
        GM_xmlhttpRequest({
            method: 'POST',
            url:  GM_getValue("serverURL") + '/script/backend/\n' + url ,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-agent": "Mozilla/1.0 (compatible)"
            },
            onload: function(responseDetails) {
                if (typeof cb !== 'undefined') {
                    cb(responseDetails.responseText);
                }
                if(msg == 1) { DisplayMessage("Data Collected"); }
                //alert(url);
            },
            onerror: function(responseDetails) {
                console.log("errorstatus:" + responseDetails.status);
                console.log("errorresponseText:" + responseDetails.responseText);
                //alert("Request for contact resulted in error code: " + responseDetails.status);
            }
        });
    }
    //headers: {'User-agent': 'Mozilla/1.0 (compatible)', },
    function getMenutable() {
        var tables=document.getElementsByTagName("table");
        for (var i=0;i<tables.length;i++) {
            if (tables[i].rows.length >= 2) {
                if (tables[i].rows[1].cells[0].innerHTML.match('Command Center')) return i;
            }
        }
        return -1;
    }
    function changeRaceValues(nr) {//NOT USED YET
        var basicArmory = new Array(0,0,0,0);
        var bonus = new Array(new Array(0,0,15,0),new Array(0,40,0,0),new Array(0,0,45,0),new Array(40,20,0,0),new Array(0,0,0,35));
        var oldValues = new Array(parseInt(GM_getValue("salt_SA",0)),parseInt(GM_getValue("salt_DA",0)),parseInt(GM_getValue("salt_SPY",0)),parseInt(GM_getValue("salt_SENTRY",0)));
        if (GM_getValue("salt_myRACE",-1) == 1) mynr = 0;
        if (GM_getValue("salt_myRACE",-1) == 2) mynr = 1;
        if (GM_getValue("salt_myRACE",-1) == 4) mynr = 2;
        if (GM_getValue("salt_myRACE",-1) == 8) mynr = 3;
        if (GM_getValue("salt_myRACE",-1) == 16) mynr = 4;
        for (var i=0;i<4;i++) {
            if (mynr == nr) {
                var newV = oldValues[i];
                var diff = 0;
            } else {
                var newV = basicArmory[i] + Math.floor((basicArmory[i] / 100) * bonus[nr][i]);
                var diff = newV - oldValues[i];
            }
            var clr = 'white';
            if (diff >0) clr='lime';
            if (diff <0) clr='red';
            var elem = "ovtd_"+i.toString();
            document.getElementById(elem).innerHTML = addCommas(oldValues[i].toString());
            elem = "nvtd_"+i.toString();
            document.getElementById(elem).innerHTML = addCommas(newV.toString());
            elem = "difftd_"+i.toString();
            document.getElementById(elem).innerHTML = addCommas(diff.toString());
            document.getElementById(elem).style.color = clr;
            if (((nr == 0) && (mynr != 0)) || ((nr == 1) && (mynr != 1))) {
                var ic = GM_getValue("rfl_INCOME",-1);
                var b = 1.20;
                if (nr == 1) b = 1.15;
                var addIncome = Math.floor(ic * b) - ic;
                document.getElementById("incomeChange").innerHTML = "Income +"+addCommas(addIncome);
            } else {
                document.getElementById("incomeChange").innerHTML = '';
            }
        }
    }
    function makediv(name,zi,w,h,l,t,c,header) {
        if (document.getElementById(name)) return;
        var newdiv = document.createElement('div');
        newdiv.setAttribute('id', name);
        if (w > 0) newdiv.style.width = w;
        if (h > 0) newdiv.style.height = h;
        newdiv.style.overflow = "auto";
        newdiv.style.position = "absolute";
        if (l >-1) newdiv.style.left = l;
        if (t >-1) newdiv.style.top = t;
        newdiv.style.zIndex = zi;
        newdiv.style.background = c;
        newdiv.style.borderWidth = '0px 2px 2px 2px';
        newdiv.style.borderStyle = 'solid';
        newdiv.style.borderColor = 'grey darkgrey darkgrey darkgrey';
        //newdiv.style.borderColor = '#cacaca #000000 #000000 #cacaca';
        document.body.appendChild(newdiv);
        var newHTML = ' <div id="drag_'+name+'" style="width:100%;">';
        newHTML += ' <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><th>'+header+'<span class="cursor" id="close_'+name+'" style="float:right;">Exit[X]</span></th></tr></table>';
        newHTML += ' </div>';
        newHTML += ' <div id="content_'+name+'" style="padding:4px;">';
        newHTML += ' </div>';
        document.getElementById(name).innerHTML = newHTML;
        var drag_id = "drag_"+name;
        GM_setValue(name,1);
        document.getElementById(drag_id).addEventListener('mousedown',function(e) {
            dragStart(e,name);
        },false);
        var close_id = "close_"+name;
        document.getElementById(close_id).addEventListener('click',function(e) {
            GM_setValue(name,0);
            closediv(name);
        },false);
    }
    function closediv(name) {
        if (name == "infoDiv") doRecon = false;
        if (name == "sabotageDiv") doSabbing = false;
        if (document.getElementById(name)) document.body.removeChild(document.getElementById(name));
    }
    var dragObj = new Object();
    dragObj.zIndex = 0;

    function dragStart(event, id) {
        //var dragObj = new Object();
        //dragObj.zIndex = 0;
        var el;
        var x, y;
        if (id)
            dragObj.elNode = document.getElementById(id);
        else {
            dragObj.elNode = event.target;
            if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
        }
        dragObj.elNode.style.cursor = 'move';
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
        dragObj.cursorStartX = x;
        dragObj.cursorStartY = y;
        dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
        dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
        if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
        if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;
        dragObj.elNode.style.zIndex = ++dragObj.zIndex;
        document.addEventListener("mousemove", dragGo,   true);
        document.addEventListener("mouseup",   dragStop, true);
        event.preventDefault();
    }
    function dragGo(event) {
        //var dragObj = new Object();
        //dragObj.zIndex = 0;
        var x, y;
        x = event.clientX + window.scrollX;
        y = event.clientY + window.scrollY;
        dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
        dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
        if (dragObj.elNode.offsetLeft < 0) dragObj.elNode.style.left = '0px';
        if (dragObj.elNode.offsetTop < 0) dragObj.elNode.style.top = '0px';
        event.preventDefault();
    }
    function dragStop(event) {
        //var dragObj = new Object();
        //dragObj.zIndex = 0;
        document.removeEventListener("mousemove", dragGo,   true);
        document.removeEventListener("mouseup",   dragStop, true);
        dragObj.elNode.style.cursor = 'default';
        var ex = dragObj.elNode.id + 'X';
        var ey = dragObj.elNode.id + 'Y';
        GM_setValue(ex,dragObj.elNode.offsetLeft);
        GM_setValue(ey,dragObj.elNode.offsetTop);
    }
    function colorPicker(obj) {
        var cArray = new Array(new Array('330000','333300','336600','339900','33CC00','33FF00','66FF00','66CC00','669900','666600','663300','660000','FF0000','FF3300','FF6600','FF9900','FFCC00','FFFF00'),new Array('330033','333333','336633','339933','33CC33','33FF33','66FF33','66CC33','669933','666633','663333','660033','FF0033','FF3333','FF6633','FF9933','FFCC33','FFFF33'),new Array('330066','333366','336666','339966','33CC66','33FF66','66FF66','66CC66','669966','666666','663366','660066','FF0066','FF3366','FF6666','FF9966','FFCC66','FFFF66'),new Array('330099','333399','336699','339999','33CC99','33FF99','66FF99','66CC99','669999','666699','663399','660099','FF0099','FF3399','FF6699','FF9999','FFCC99','FFFF99'),new Array('3300CC','3333CC','3366CC','3399CC','33CCCC','33FFCC','66FFCC','66CCCC','6699CC','6666CC','6633CC','6600CC','FF00CC','FF33CC','FF66CC','FF99CC','FFCCCC','FFFFCC'),new Array('3300FF','3333FF','3366FF','3399FF','33CCFF','33FFFF','66FFFF','66CCFF','6699FF','6666FF','6633FF','6600FF','FF00FF','FF33FF','FF66FF','FF99FF','FFCCFF','FFFFFF'),new Array('0000FF','0033FF','0066FF','0099FF','00CCFF','00FFFF','99FFFF','99CCFF','9999FF','9966FF','9933FF','9900FF','CC00FF','CC33FF','CC66FF','CC99FF','CCCCFF','CCFFFF'),new Array('0000CC','0033CC','0066CC','0099CC','00CCCC','00FFCC','99FFCC','99CCCC','9999CC','9966CC','9933CC','9900CC','CC00CC','CC33CC','CC66CC','CC99CC','CCCCCC','CCFFCC'),new Array('000099','003399','006699','009999','00CC99','00FF99','99FF99','99CC99','999999','996699','993399','990099','CC0099','CC3399','CC6699','CC9999','CCCC99','CCFF99'),new Array('000066','003366','006666','009966','00CC66','00FF66','99FF66','99CC66','999966','996666','993366','990066','CC0066','CC3366','CC6666','CC9966','CCCC66','CCFF66'),new Array('000033','003333','006633','009933','00CC33','00FF33','99FF33','99CC33','999933','996633','993333','990033','CC0033','CC3333','CC6633','CC9933','CCCC33','CCFF33'),new Array('000000','003300','006600','009900','00CC00','00FF00','99FF00','99CC00','999900','996600','993300','990000','CC0000','CC3300','CC6600','CC9900','CCCC00','CCFF00'),new Array('000000','111111','222222','333333','444444','555555','666666','777777','888888','999999','AAAAAA','BBBBBB','CCCCCC','DDDDDD','EEEEEE','FFFFFF','444444','444444'));
        var Xpos = 10;var Ypos = 10;
        if (GM_getValue("colorPickerDivX",-1) != -1) Xpos = GM_getValue("colorPickerDivX",10);
        if (GM_getValue("colorPickerDivY",-1) != -1) Ypos = GM_getValue("colorPickerDivY",10);
        makediv('colorPickerDiv',3,0,0,Xpos,Ypos,'#272727','Color Picker');
        newHTML = '<table border="0" cellpadding="0" cellspacing="2">';
        for (var i=0;i<13;i++) {
            newHTML += '<tr>';
            for (var j=0;j<18;j++) {
                var tid = 'cl_'+i+'_'+j;
                newHTML += '<td id="'+tid+'" style="background-color:#'+cArray[i][j]+';width:16px;height:16px;font-size:1%;">&nbsp;</td>';
            }
            newHTML += '</tr>';
        }
        newHTML += '</table>';
        document.getElementById("content_colorPickerDiv").innerHTML = newHTML;
        for (var i=0;i<13;i++) {
            for (var j=0;j<18;j++) {
                var tid = 'cl_'+i+'_'+j;
                document.getElementById(tid).addEventListener('click',function(e) {
                    var wc = e.target.id.replace('cl_','');
                    var wc = wc.split('_');
                    var c = '#'+cArray[wc[0]][wc[1]];
                    document.getElementById(obj).style.background = c;
                    GM_setValue(obj,c);
                    closediv("colorPickerDiv");
                },false);
            }
        }
    }
    function myWarList(message) {
        ReturnRequest('E_GetWarnames.php?get=name&user='+GM_getValue("Koc_User"),0,function(r){
            DisplayWarlist(r);
            //Loading(r);
        });
    }
    function addCommas( sValue ){
        sValue = String(sValue);
        var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
        while(sRegExp.test(sValue)) {
            sValue = sValue.replace(sRegExp, '$1,$2');
        }
        return sValue;
    }
    function removeCommas(number) {
        str = String(number);
        return parseInt((str.replace(/,/g,'')));
    }
    function removeComma(num) {
        return num.replace(/,/g, "");
    }
    function getRace(nr) {
        if (nr == 1) return "Humans";
        if (nr == 2) return "Dwarves";
        if (nr == 4) return "Elves";
        if (nr == 8) return "Orcs";
        if (nr == 16) return "Undead";
        if (nr == 32) return "Hobbits";
        return -1;
    }
    function getRaceNr(race) {
        if (race == 'Humans') return 1;
        if (race == 'Dwarves') return 2;
        if (race == 'Elves') return 4;
        if (race == 'Orcs') return 8;
        if (race == 'Undead') return 16;
        if (race == 'Hobbits') return 32;
        return -1;
    }
    function FindText(str, str1, str2){
        var pos1 = str.indexOf(str1);
        //alert(pos1);
        if (pos1 == -1) return '';
        pos1 += str1.length;
        var pos2 = str.indexOf(str2, pos1);
        if (pos2 == -1) return '';
        //alert(pos1,pos2);
        return str.substring(pos1, pos2);
    }
    function InStr(strSearch, strFind){
        strSearch = String(strSearch);
        strFind = String(strFind);
        return (strSearch.indexOf(strFind) >= 0);
    }
    function addCSS(css){
        GM_addStyle(css);
    }
    function addJS(){
        var head = document.getElementsByTagName("head")[0];
        if (!head) {
            return;
        }
        var style = document.createElement("script");
        style.type = "text/javascript";
        var s = '';
        foreach(arguments, function(style){s+=style+"\n";});
        style.innerHTML = s;
        head.appendChild(style);
    }
    function foreach(stuff, f){
        for(var i=0; i < stuff.length; i++) {
            var stop_iter = f(stuff[i]);
            if (stop_iter) return;
        }
    }
    function SortIt(TheArr,u,v,w,x,y,z){

        TheArr.sort(Sorter);

        function Sorter(a,b){
            var swap=0;
            if (isNaN(a[u]-b[u])){
                if((isNaN(a[u]))&&(isNaN(b[u]))){swap=(b[u]<a[u])-(a[u]<b[u]);}
                else {swap=(isNaN(a[u])?1:-1);}
            }
            else {swap=(a[u]-b[u]);}
            if((v==undefined)||(swap!=0)){return swap;}
            else{
                if (isNaN(a[v]-b[v])){
                    if((isNaN(a[v]))&&(isNaN(b[v]))){swap=(b[v]<a[v])-(a[v]<b[v]);}
                    else {swap=(isNaN(a[v])?1:-1);}
                }
                else {swap=(a[v]-b[v]);}
            }
            if((w==undefined)||(swap!=0)){return swap;}
            else{
                if (isNaN(a[w]-b[w])){
                    if((isNaN(a[w]))&&(isNaN(b[w]))){swap=(b[w]<a[w])-(a[w]<b[w]);}
                    else {swap=(isNaN(a[w])?1:-1);}
                }
                else {swap=(a[w]-b[w]);}
            }
            if((x==undefined)||(swap!=0)){return swap;}
            else{
                if (isNaN(a[x]-b[x])){
                    if((isNaN(a[x]))&&(isNaN(b[x]))){swap=(b[x]<a[x])-(a[x]<b[x]);}
                    else {swap=(isNaN(a[x])?1:-1);}
                }
                else {swap=(a[x]-b[x]);}
            }
            if((y==undefined)||(swap!=0)){return swap;}
            else{
                if (isNaN(a[y]-b[y])){
                    if((isNaN(a[y]))&&(isNaN(b[y]))){swap=(b[y]<a[y])-(a[y]<b[y]);}
                    else {swap=(isNaN(a[y])?1:-1);}
                }
                else {swap=(a[y]-b[y]);}
            }
            if((z==undefined)||(swap!=0)){return swap;}
            else{
                if (isNaN(a[z]-b[z])){
                    if((isNaN(a[z]))&&(isNaN(b[z]))){swap=(b[z]<a[z])-(a[z]<b[z]);}
                    else {swap=(isNaN(a[z])?1:-1);}
                }
                else {swap=(a[z]-b[z]);}
            }
            return swap;
        }
    }

    function BaseSetUp(event){
        if((InStr(event.target,'kingsofchaos.com') == true) || (InStr(event.target.parentNode,'kingsofchaos.com') == true)){ //We'r clicking a link
            if(h4xed == 1){
                GM_openInTab(event.target);
            }else{
                if(InStr(event.target.parentNode,'kingsofchaos.com') == true){
                    window.location = event.target.parentNode;
                }else{
                    window.location = event.target;
                }
            }
        }else{

        }
        if(event.target.name == 'RaWr'){
            //Security.php
            var recaptcha_response_field = document.getElementsByName("recaptcha_response_field")[0].value;
            var recaptcha_challenge_field = document.getElementsByName("recaptcha_challenge_field")[0].value;
            params = 'recaptcha_challenge_field=' + recaptcha_challenge_field + '&recaptcha_response_field=' + recaptcha_response_field;
            //	document.getElementById('sometext').innerHTML = "Processing, I think?";
            doSecurity(params,function(html){
                if ((pos = html.indexOf('Security')) > 0) {
                    securityFunc();
                }else{
                    StopLoading();
                    GoldFinder(document.getElementsByName('s')[0].value,document.getElementsByName('mg')[0].value,document.getElementsByName('mt')[0].value,document.getElementsByName('striptff')[0].value,document.getElementsByName('ircpaste')[0].value);
                }
            });
        }
        if(h4xed == 1){
            event.stopPropagation();
            event.preventDefault();
        }
    }


    function IsNumeric(sText){
        var ValidChars = "0123456789.";
        var IsNumber=true;
        var Char;
        for (i = 0; i < sText.length && IsNumber == true; i++){
            Char = sText.charAt(i);
            if (ValidChars.indexOf(Char) == -1){
                IsNumber = false;
            }
        }
        return IsNumber;
    }

    function WeaponFromStrength(s){
        var Wfsf;
        Wfsf='';
        if (InStr(s,'BPM') == true) {
            Wfsf = '1000';
        }else if (InStr(s,'600') == true) {
            Wfsf = 'CH';
        }else if (InStr(s,'256') == true) {
            Wfsf = 'excal';
        }else if (InStr(s,'64') == true) {
            Wfsf = 'hsteed';
        }else if (InStr(s,'30') == true) {
            Wfsf = 'bsword';
        }
        return Wfsf;
    }

    function WeaponFromName(s){
        var Wfn;
        Wfn ='x';
        if (InStr(s,'Nunchaku') == true) {
            Wfn = 'NUN';
        }else if (InStr(s,'Invisibility') == true) {
            Wfn = 'IS';
        }else if (InStr(s,'Blackpowder') == true) {
            Wfn = 'BPM';
        }else if (InStr(s,'Lookout') == true) {
            Wfn = 'LT';
        }else if (InStr(s,'Dragonskin') == true) {
            Wfn = 'Skins';
        }else if (InStr(s,'Chariot') == true) {
            Wfn = 'Chariots';
        }

        return Wfn;
    }

    function GetElement(elem, val){
        var elemList = document.getElementsByTagName(elem);
        for(var i = 0; i < elemList.length; i++){
            if(elemList[i].value.toString().indexOf(val) == 0){
                return elemList[i];
            }
        }
        return 0;
    }

    function getElementsByClass(searchClass,node,tag) {
        var classElements = new Array();
        if ( node == null )
            node = document;
        if ( tag == null )
            tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
            if ( pattern.test(els[i].className) ) {
                classElements[j] = els[i];
                j++;
            }
        }
        return classElements;
    }

    function getClassIndex(classid,text){
        var x = document.getElementsByClassName(classid);
        for(i=0;i<x.length;i++){
            if(document.getElementsByClassName(classid)[i].innerHTML.match(text)){
                return i;
            }
        }
    }

    function AccessFunction(){
        if(document.location.toString().indexOf("?id=warlist") != -1){
            var page = document.location.toString().split("stats.php?id=warlist")[1];

            //alert(page);
            var target_ID = ('warlist');
            //alert(target_ID);
            if(isNaN(target_ID)){
                var data = "targetpage="+target_ID+"&id="+GM_getValue("userid")+"&name="+GM_getValue("Koc_User");
                //var page = "https://www.kingsofchaos.com/stats.php?id="+data;
                //document.location.href=page;
                Request.Get(script.access+"customLinks.php",data);
            }
        }
        if(document.location.toString().indexOf("?id=accounts") != -1){
            var target_ID = ('accounts');
            //alert(target_ID);
            if(isNaN(target_ID)){
                var data = "targetpage="+target_ID+"&id="+GM_getValue("userid")+"&name="+GM_getValue("Koc_User");;
                Request.Post(script.access+"customLinks.php",data,function(response){
                    //alert(response);
                    var content = GetContentTD();
                    content.innerHTML = response;
                    var input_array = content.getElementsByTagName("input");
                    for(var i = 0 ; i < input_array.length ; i++){
                        input_array[i].addEventListener("click",function(event){
                            var user_ID;
                            var operation;
                            var id	= event.target.id;
                            //alert(id);
                            if(id.indexOf("_") != -1){
                                user_ID = id.split("_")[1];
                                //alert(user_ID);
                                operation = id.split("_")[0];
                                //alert("id="+user_ID+"&operation="+operation+"&invoker="+GM_getValue("userid")+"_"+GM_getValue("Koc_User"));
                                //alert(operation);
                                //alert(script.access+"changeAuth.php","id="+user_ID+"&operation="+operation+"&invoker="+GM_getValue("userid")+"_"+GM_getValue("Koc_User"),function(r){
                                Request.Post(script.access+"changeAuth.php","id="+user_ID+"&operation="+operation+"&invoker="+GM_getValue("userid")+"_"+GM_getValue("Koc_User"),function(r){
                                    //alert(r);
                                    if(r.indexOf("done") != -1){
                                        //alert(r.indexOf("done"));
                                        document.location.reload();
                                    } else if(r.indexOf("error") != -1){
                                        alert("Try getting a promotion. Your powers are weak.");
                                    } else{
                                        alert("An error occured. Please contact the script developer");
                                    }
                                });
                            }
                        },false);
                    }
                });
            }
            else{
            }
        }
        if(document.location.toString().indexOf("?id=approve") != -1){
            var target_ID = ('approve');
            if(isNaN(target_ID)){
                var data = "targetpage="+target_ID+"&id="+GM_getValue("userid")+"&name="+GM_getValue("Koc_User");;
                Request.Post(script.access+"customLinks.php",data,function(response){
                    //var parser      = new DOMParser ();
                    //var responseDoc = parser.parseFromString (response, "text/html");
                    var content = GetContentTD();
                    content.innerHTML = response;
                    //if(id.indexOf("_") != -1){
                    //console.log(content.innerHTML);
                    //var input_array = content.getElementsByTagName("input");
                    //content.querySelector('#test');
                    //var input_array = responseDoc.getElementById('approvesubmit');
                    //var input_array = responseDoc.getElementsByName("approvesubmit");
                    //console.log('INPUT: ',input_array);
                    //}
                    //var input_array = responseDoc.getElementsByName("approvesubmit")[0];
                    var input_array = content.getElementsByTagName("input");
                    //console.log('INPUT: ',input_array);
                    //for(var i = 0 ; i < input_array.length ; i++){
                    //var el = document.getElementById("approvdateend_");
                    //el.addEventListener("click", alert(input_array), false);
                    //id=\"approve_".$gAll[0]."\"
                    //id=\"approvdateend\"
                    //id=\"approvreason\"
                    //var id,date,reason,user_ID,operation;

                    //console.log('ID: '+id+' DATE: '+date+'REASON: '+reason);
                    //input_array[i].addEventListener("click", function(event) {
                    //event.preventDefault()
                    //console.log('EVENT: '+event.target.type+' ID: '+event.target.id);
                    /*if (event.target.type == "text") {
                                console.log('TYPE: ',document.getElementById('approvdateend').clicked = false);
                                //x[i].checked = true;
                                document.getElementById('approvdateend').clicked = false;
                                document.getElementById('approvreason').clicked = false;
                            }*/
                    //event.preventDefault("approvdateend");
                    //date = event.target.value;
                    /*id	= event.target.id;
                            if(id.indexOf("_") != -1){
                                user_ID = id.split("_")[1];
                                operation = id.split("_")[0];
                                Request.Post(script.access+"changeAuth.php","id="+user_ID+"&operation="+operation+"&invoker="+GM_getValue("userid")+"_"+GM_getValue("Koc_User"),function(r){
                                    if(r.indexOf("done") != -1){
                                        document.location.reload();
                                    } else if(r.indexOf("error") != -1){
                                        alert("Try getting a promotion. Your powers are weak.");
                                    } else{
                                        alert("An error occured. Please contact the script developer");
                                    }
                                });
                            }
                        }, true);*/
                    //}
                    //var input_array = content.getElementsByName("approv_dateend");
                    /* event listener */
                    //var x = content.getElementById("approv_dateend").value;
                    //document.getElementById("nap").innerHTML = "You wrote: " + x;
                    //input_array.getElementsByName("approv_dateend").addEventListener('change', doThing);


                    //alert(x);

                });
            }
        }
        if(document.location.toString().indexOf("?id=top10") != -1){
            var target_ID = ('top10');
            if(isNaN(target_ID)){
                var data = "targetpage="+target_ID+"&id="+GM_getValue("userid")+"&name="+GM_getValue("Koc_User");;
                Request.Post(script.access+"customLinks.php",data,function(response){
                    var content = GetContentTD();
                    content.innerHTML = response;
                    var input_array = content.getElementsByTagName("input");
                    for(var i = 0 ; i < input_array.length ; i++){
                        input_array[i].addEventListener("click",function(event){
                            var id	= event.target.id;
                            alert(id);

                        },false);

                    }

                });
            }
        }
    }
    /* function */
    function doThing(){
        alert('Horray! Someone wrote "' + this.value + '"!');
    }
    function checkAuthorization(everywhere){
        var username = "";
        var userid = "";
        if (everywhere) {
            if ((GM_getValue("userid","") != "") && (GM_getValue("username","") != "")) {
                username = GM_getValue("username","");
                userid = GM_getValue("userid","");
            }
        }
        else {
            username = FindText(document.title,"Kings of Chaos :: ","'s ");
            userid = FindText(document.body.innerHTML, '<td><a href="stats.php?id=' , '">');
            GM_setValue("username",username);
            GM_setValue("userid",userid);
            //alert(username);
        }
        if(username == ""){
            window.location.replace("https://kingsofchaos.com/base.php");
        }
        else{
            var data = "name="+GM_getValue("username",username)+"&id="+GM_getValue("userid",userid);
            Request.Post(script.access+"checkAuth.php",data,function(response){
                response = response.substr(0,response.length-1).replace(/\s|\r|\n/g,'');
                //if ((response == "regularuser") || (response == "admin") || (response == "moderator") || (response == "owner")){
                if ((response == "usernotauthorized") || (response == "allieduser") || (response == "regularuser") || (response == "moderator") || (response == "admin") || (response == "owner")){
                    //alert(response);
                    if(response == "usernotauthorized"){
                        GM_setValue('show_Optionsbtn','1');
                        GM_setValue('gr',false);
                    } else if(response != "usernotauthorized"){
                        GM_setValue('show_Optionsbtn','0');
                        GM_setValue('gr',true);
                    }
                    GM_setValue('newsboard_area','1');
                    //GM_setValue('gr',true);
                } else if(response == "userdontexist"){
                    GM_setValue('newsboard_area','0');
                    /*var askQ = confirm("Do you want Script access?");
				if (askQ == true){
                    Request.Post(script.access+"requestAccess.php",data,function(response){
                    });
				}*/ /*else{
					window.location.replace("https://kingsofchaos.com/stats.php?id="+GM_getValue("userid",userid));
				}*/
                }
                else{
                    GM_setValue('gr',false);
                    //alert("You are not authorized to use this script. Please contact an admin to get authorization");
                }
            });
        }
    }

    function SiegeList(m) {
        // Returns: Multiply | Next Upgrade | Next Price | Next Multiply
        switch(m){
            case 'None': { return '1.00|Flaming Arrows|50,000|1.30'; break }
            case 'Flaming Arrows': { return '1.30|Ballistas|100,000|1.69'; break }
            case 'Ballistas': { return '1.69|Battering Ram|200,000|2.20'; break }
            case 'Battering Ram': { return '2.20|Ladders|400,000|2.86'; break }
            case 'Ladders': { return '2.86|Trojan Horse|800,000|3.71'; break }
            case 'Trojan Horse': { return '3.71|Catapults|1,600,000|4.83'; break }
            case 'Catapults': { return '4.83|War Elephants|3,200,000|6.27'; break }
            case 'War Elephants': { return '6.27|Siege Towers|6,400,000|8.16'; break }
            case 'Siege Towers': { return '8.16|Trebuchets|12,800,000|10.60'; break }
            case 'Trebuchets': { return '10.60|Black Powder|25,600,000|13.79'; break }
            case 'Black Powder': { return '13.79|Sappers|51,200,000|17.92'; break }
            case 'Sappers': { return '17.92|Dynamite|102,400,000|23.30'; break }
            case 'Dynamite': { return '23.30|Greek Fire|204,800,000|30.29'; break }
            case 'Greek Fire': { return '30.29|Cannons|409,600,000|39.37'; break }
            case 'Cannons': { return '39.37|Great Horn|819,200,000|51.19'; break }
            case 'Great Horn': { return '51.19|Max|Max|Max'; break }
            default: { return 'Max|Max|Max|Max'; break }
        }
    }

    function FortList(m) {
        // Returns: Multiply | Next Upgrade | Next Price | Next Multiply
        switch(m){
            case 'Camp': { return '1.00|Stockade|50,000|1.25'; break }
            case 'Stockade': { return '1.25|Rabid Pitbulls|100,000|1.56'; break }
            case 'Rabid Pitbulls': { return '1.56|Walled Town|200,000|1.95'; break }
            case 'Walled Town': { return '1.95|Towers|400,000|2.44'; break }
            case 'Towers': { return '2.44|Battlements|800,000|3.05'; break }
            case 'Battlements': { return '3.05|Portcullis|1,600,000|3.81'; break }
            case 'Portcullis': { return '3.81|Boiling Oil|3,200,000|4.77'; break }
            case 'Boiling Oil': { return '4.77|Trenches|6,400,000|5.96'; break }
            case 'Trenches': { return '5.96|Moat|12,800,000|7.45'; break }
            case 'Moat': { return '7.45|Drawbridge|25,600,000|9.31'; break }
            case 'Drawbridge': { return '9.31|Fortress|51,200,000|11.64'; break }
            case 'Fortress': { return '11.64|Stronghold|102,400,000|14.55'; break }
            case 'Stronghold': { return '14.55|Palace|204,800,000|18.19'; break }
            case 'Palace': { return '18.19|Keep|409,600,000|22.74'; break }
            case 'Keep': { return '22.74|Citadel|819,200,000|28.42'; break }
            case 'Citadel': { return '28.42|Hand of God|1,638,400,000|35.53'; break }
            case 'Hand of God': { return '35.53|Gates of Hell|3,276,800,000|44.41'; break }
            case 'Gates of Hell': { return '44.41|Max|Max|Max'; break }
            default: { return 'Max|Max|Max|Max'; break }
        }
    }

    function logLostWeapon(m) {

        var dt = new Date();
        var unixtime = Math.max((Date.parse(dt))/1000);
        GM_setValue("logSab_10",GM_getValue("logSab_9",""));
        GM_setValue("logSab_9",GM_getValue("logSab_8",""));
        GM_setValue("logSab_8",GM_getValue("logSab_7",""));
        GM_setValue("logSab_7",GM_getValue("logSab_6",""));
        GM_setValue("logSab_6",GM_getValue("logSab_5",""));
        GM_setValue("logSab_5",GM_getValue("logSab_4",""));
        GM_setValue("logSab_4",GM_getValue("logSab_3",""));
        GM_setValue("logSab_3",GM_getValue("logSab_2",""));
        GM_setValue("logSab_2",GM_getValue("logSab_1",""));
        GM_setValue("logSab_1",m + '|' + unixtime);
    }

    function isTurn(){
        if((document.body.innerHTML.match("<title>Ignore this</title>")) || (document.body.innerHTML.match("Covert Mission Report")) || (document.body.innerHTML.match("Attack Mission"))){
            //DO NOTHING HERE
        }else{
            var t = false;
            var d=new Date();
            var hour = d.getHours();
            var minute = d.getMinutes();
            var sec = d.getSeconds();
            if(sec < 10) { sec = '0' + sec; };
            if(minute < 10) { minute = '0' + minute; }
            if(hour < 10) { hour = '0' + hour; }
            document.title = hour + ':' + minute + ':' + sec;
            if(GM_getValue('acClock') != 0){
                DisplayMessage2('<font size=6>' + hour + ':' + minute + ':' + sec + '</font>');
            }
            if(((minute == '35') || (minute == '5')) && (sec == '59')){
                // Notice user to hit?!?!
                alert('hit');
            }
            setTimeout(isTurn,600);
            return t;
        }
    }

    function expcolTable(text){
        var table;
        var elems = document.getElementsByTagName('table');
        for (i = 0; i < elems.length; i++){
            /*if (elems[i].rows[0].cells[0].innerHTML.match(text)){
            table = elems[i];
        }*///elems[i].rows[0].cells[0] != null &&
            if (elems[i].rows[0].cells[0].innerHTML.match(text)){
                table = elems[i];
                //alert(table);
            }
        }
        if(table){
            //alert(table.rows[0].style.cursor);
            table.rows[0].style.cursor = 'pointer';
            for (i = 1; i < table.rows.length; i++){
                if(GM_getValue("hideTable_"+text) == 1){
                    table.rows[i].style.display = table.rows[i].style.display != 'none' ? 'none' : '';
                }
            }
            table.rows[0].addEventListener('click', function(event){
                event.stopPropagation();
                event.preventDefault();
                //alert(GM_getValue("hideTable_"+text));
                if(GM_getValue("hideTable_"+text) == 1){
                    for (i = 1; i < table.rows.length; i++){
                        table.rows[i].style.display = table.rows[i].style.display = '';
                        GM_setValue("hideTable_"+text, 0)
                    }
                }else{
                    for (i = 1; i < table.rows.length; i++){
                        table.rows[i].style.display = table.rows[i].style.display != 'none' ? 'none' : '';
                    }
                    GM_setValue("hideTable_"+text, 1)
                }
            }, true);
        }
    }

    function GetTag(tag, inner){
        var tagList = document.getElementsByTagName(tag);
        for(z = 0; z < tagList.length; z++){
            if(tagList[z].innerHTML.indexOf(inner) == 0){
                return tagList[z];
            }
        }
        return 0;
    }

    function GetText(){
        var doc = document.body.innerHTML;
        var pos = 0;
        for(z = 0; z < (arguments.length - 1); z++){
            pos = doc.indexOf(arguments[z], pos);
            if(pos < 0) return "";
            pos += arguments[z].length;
        }
        var pos2 = doc.indexOf(arguments[arguments.length - 1], pos);
        if(pos2 < 0) return "";
        return doc.substring(pos, pos2);
    }

    function GetContentTD(){
        var tables = document.getElementsByClassName("content");
        if(tables.length == 0){
            return 0;
        }
        return tables[0];
    }

    function getText2(where,start,end){
        var thisStart = where.indexOf(start) + start.length;
        var thisEnd = where.indexOf(end, thisStart);

        return where.substring(thisStart,thisEnd);
    }
    function getTableByHeader(header){
        var tables = document.getElementsByTagName("table");
        for(var t = 0 ; t < tables.length ; t++){
            if(tables[t].rows[0].innerHTML.replace(/\s/g, '') == header.replace(/\s/g, '')){
                return tables[t];
            }
        }
        return "table not found";
    }
    function getRowByHeader(header){
        var tables = document.getElementsByTagName("table");
        for(var t = 0 ; t < tables.length ; t++){
            if(tables[t].rows[0].innerHTML.replace(/\s/g, '') == header.replace(/\s/g, '')){
                return tables[t].rows[0];
            }
        }
        return "row not found";
    }
    //})();
    function customLog(name, value) {
        var text = "'"+name+"'[[[";
        //console.log("===> "+text,value+"]]]");
    }
    //$.each(myCustArrLog, function( index, value ) {
    //console.log( index + ": " + value );
    //});
})();
