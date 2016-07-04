# get fancy australian election data
### courtesy of the ABC

installing: 
```
npm install au-election --save
```

example code: 
```javascript
import getData from "au-election";

getData((err,data) => {
    if(err) {
        console.log("boo hoo");
        return console.trace(err);
    }

    // do shit with data
    // data is an IElectionData object (see interfaces.ts)
});
```
