Feedback

### vcc-ui documentation website

LocalSubMenu does not show how to import
kitchen-sink example does not exist

### vcc-ui actual usage

---

Trying using tabNav:
Error: The "useFela" hook can only be used inside a "RendererProvider" - We should throw a more descriptive message. Even though we use "useFela", this should be transparent to the user, as he shouldn't care/be aware of what we use.
A proper message would be: "To use TabNav component, you need to first set up a StyleProvider."

---

I didn't know I had to use the ThemePicker, so this error showed up.

TypeError: Cannot read properties of undefined (reading 'ornament')

This error happened while generating the page. Any console logs will be displayed in the terminal window.
Call Stack
Object.nav
file:///C:/git/god-frontend-code-test/node_modules/vcc-ui/dist/components/tab-nav/index.js (46:83)

```
return {
      flexDirection: 'row',
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      borderBottomColor: reverseOut ? theme.color.primitive.grey100 : theme.color.ornament.divider,
      backgroundColor: reverseOut ? theme.color.primitive.grey100 : theme.color.background.secondary
    };
```

Once again, I think we should improve error feedback. And we should actually check if we have a theme.

---
