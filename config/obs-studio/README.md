# OBS config

This is a manual export of OBS's configuration
files. To track our scenes over time. Perhaps to
revert.

To export:

```
./sync
```

OBS stores in plain text streaming keys and query param auth tokens. This
folder's sync process should take care to remove sensitive data from source
control. **TODO:** hide more credentials and rotate their keys in production.
