const url = {
  // timelineById: (id: number) => `/api/timeline/${id}`,
  timelineById: (id: number): string => `/api/timeline/${id}`,
  indexCardById: (id: number): string => `/api/indexcard/${id}`
}

export default url
