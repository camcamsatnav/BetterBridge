import Settings from "./settings";

register("command", () => {
    Settings.openGUI();
}).setTabCompletions('settings').setName('bridge')


const colorArray = ["&4", "&c", "&6", "&e", "&2", "&a", "&b", "&3", "&1", "&9", "&d", "&5", "&f", "&7", "&8", "&0"];
register("chat", bridgeChat).setCriteria("&r&2Guild > ${*} ${bot} ${*}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${bot} ${*}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${*} ${bot}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${bot}: &r${player}" + Settings.seperator + " ${msg}&r");

function bridgeChat(bot, player, msg, event) {
    if (!Settings.enabled || Settings.botName.toLowerCase() !== ChatLib.removeFormatting(bot).toLowerCase()) return;
    cancel(event);
    bridgeText = Settings.prefix;
    if (Settings.prefixBold === true) { bridgeBold = "&l" } else { bridgeBold = "" }
    if (Settings.userBold === true) { discordBold = "&l" } else { discordBold = "" }
    bridgeColor = colorArray[Settings.bridgeColor]
    discordColor = colorArray[Settings.userColor]
    let combined = addLinks(`§2Guild > ${bridgeColor + bridgeBold + bridgeText} ${discordColor + discordBold + player}§r: ${msg}`, event)
    ChatLib.chat(combined);
}

const cl = new Changelog('UniversalBridge', '1.6.0', '&aMiscellaneous Changes and Bug Fixes')
cl.writeChangelog({ changelog: "&b", name: "&e", version: "&e" })


function addLinks(msg, event) { //adds the links and hoverables to the output string
    let newmsg = new TextComponent(msg.replace("&rhttp", "http"));
    new Message(event).getMessageParts().forEach(part => {
        if (part.clickValue) newmsg.setClick(part.clickAction, part.clickValue)
        if (part.hoverValue) newmsg.setHoverValue(part.hoverValue)
    })
    return newmsg
}