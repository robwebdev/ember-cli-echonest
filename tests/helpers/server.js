function success (response) {
  return [200, { 'Content-Type': 'application/json' }, JSON.stringify(response)];
}

export {success};
