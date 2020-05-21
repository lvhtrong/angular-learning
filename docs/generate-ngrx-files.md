# Generate NgRx files

## Entity

This is used to generate actions, reducers, model that belong to a specific entity

* Open terminal and type: ```ng g en store/<entityName> --skipTest -r <relativePathToParentReducer>```

## Reducers

* Open terminal and type: ```ng g r store/<reducerName> --flat false --group --skipTest -r <relativePathToParentReducer>```

## Selectors

* Open terminal and type: ```ng g se store/<reducerName> --flat false --group --skipTest -r <relativePathToParentReducer>```
