import { SplitFactory } from "@splitsoftware/splitio";
import store from "./store";

const SDK_STATE = {
  LOADING: 'loading',
  READY: 'ready',
  TIMED_OUT: 'timed_out'
};
// Flags I'll use by default.
const MY_DEFAULT_FLAGS = {
  'search-bar': 'off'
};

const factory: SplitIO.ISDK = SplitFactory({
  core: {
    authorizationKey: "ofeavnlpbjk6lfa293lfifs7b6rkgjagnavv",
    key: "94525800-de94-11e7-b605-0aabb9f98874"
  },
  startup: {
    readyTimeout: 0.5 // seconds
  }
});

const client: SplitIO.IClient = factory.client();
const manager: SplitIO.IManager = factory.manager();

const state = {
  flags: {},
  sdkState: SDK_STATE.LOADING
};

const getters = {
  splitFlags: (state: any) => state.flags,
  splitState: (state: any) => state.sdkState
};

const actions = {
  reloadFlags(context: any, attributes = {}) {
    const mySplits = manager.names();
    const newFlags = client.getTreatments(mySplits, attributes);

    context.commit('reloadFlags', newFlags);
  },
  updateSdkState(context: any, newState: string) {
    context.commit('updateSdkState', newState);
  },
  loadStaticFlags(context: any) {
    context.commit('reloadFlags', MY_DEFAULT_FLAGS);
  }
};

const mutations = {
  reloadFlags(state: any, newFlags: {[attributeName: string]: string }) {
    state.flags = newFlags;
  },
  updateSdkState(state: any, newState: string) {
    state.sdkState = newState;
  }
};

client.on(client.Event.SDK_READY, () => {
  console.log('Split SDK is READY.');
  store.dispatch('updateSdkState', SDK_STATE.READY);

  store.dispatch('reloadFlags', {
    customAttr1: true
  });
  // Once we're ready, we can remove the listeners to the timed_out event
  client.removeAllListeners(client.Event.SDK_READY_TIMED_OUT);
});

client.on(client.Event.SDK_READY_TIMED_OUT, () => {
  console.log('Split SDK had a timed out event.');
  store.dispatch('updateSdkState', SDK_STATE.TIMED_OUT);
  
  // If we received a timeout, we'll load a set of predefined flags so we load our app in default state.
  store.dispatch('loadStaticFlags');

  // We won't remove the ready event listener, since the SDK can still get ready, we're just reacting 
  // in case there's a timeout.
});

client.on(client.Event.SDK_UPDATE, () => {
  console.log('Split SDK data updated.');
  
  // On each update, update the flags.
  store.dispatch('reloadFlags', {
    customAttr1: true
  });
});

export default {
  state, getters, actions, mutations
};