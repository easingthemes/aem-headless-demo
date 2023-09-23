export const MODELS = {
  filters: {
    name: 'sessions',
    path: 'adaptTo/filter-by-day'
  },
  items: {
    name: 'sessions',
    fields: `{
      scheduledAt
      name
      speaker
      _path
    }`
  },
  item: {
    name: 'sessions',
    fields: `{
      name
      description {
        html
      }
      scheduledAt
      speaker
      _path
    }`
  },
  query: `query ($before: Calendar, $after: Calendar) {
    sessionsList(
      sort: "scheduledAt"
      filter: {
        scheduledAt: {
          _expressions: [
            {value: $before, _operator: BEFORE}
            {value: $after, _operator: AFTER}
          ]
        }
      }
    ) {
      items {
        scheduledAt
        name
        speaker
        _path
      }
    }
  }`
}
