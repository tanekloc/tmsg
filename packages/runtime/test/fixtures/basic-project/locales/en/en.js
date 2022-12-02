export default {
  Hello: () => 'Hello',
  'Hello {%ARG1}': (d) => `Hello ${d.ARG1}`,
  'Hello {%ARG1} {%ARG1} {%ARG3}': (d) => `Hello ${d.ARG1} ${d.ARG1} ${d.ARG3}`,
};
