<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Home"></Label>
    </ActionBar>

    <StackLayout>
      <Label class="info" horizontalAlignment="center" verticalAlignment="center">
        <FormattedString>
          <Span class="fa" text.decode="&#xf135; "/>
          <Span :text="message"/>
        </FormattedString>
      </Label>
      <Button text="Snackbar" @tap="showSnackbar" class="btn btn-primary"/>
    </StackLayout>
  </Page>
</template>

<script>
import { SnackBar } from 'nativescript-snackbar';

export default {
  computed: {
    message() {
      return 'Blank {N}-Vue app';
    }
  },
  methods: {
    showSnackbar() {
      const x = new SnackBar();
      x.simple('Hello from Snackbar', '#fff000', '#111').then(args => {
        console.log('snackbar resolve', args);
      });
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import '../app-variables';
// End custom common variables

// Custom styles
.fa {
  color: $accent-dark;
}

.info {
  font-size: 20;
}
</style>
