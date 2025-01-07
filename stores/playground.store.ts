import { defineStore } from "pinia";
import type { Component } from "vue";
import APIMethod from "~/components/APIMethod.vue";
import GlobalConfig from "~/components/GlobalConfig.vue";
import Response from "~/components/Response.vue";
import { useNetStack, type HttpMethod } from "~/composable/useNetStackNuxt";
import APIEndpointSetup from "~/components/APIEndpointSetup.vue";
const { executeCall, updateGlobalConfig } = useNetStack();

type PlayGroundMenuOption = {
  title: string;
  isVisible: boolean;
  component: Component;
};
type MenuItem = {
  title: string;
  isSelected: boolean;
};
export const usePlaygroundStore = defineStore("counter", {
  state: () => ({
    playgroundMainMenu: <PlayGroundMenuOption[]>[
      {
        title: "Configure Globals",
        isVisible: false,
        component: GlobalConfig,
      },
      {
        title: "Configure Method Type",
        isVisible: true,
        component: APIMethod,
      },
      {
        title: "Configure Endpoint",
        isVisible: true,
        component: APIEndpointSetup,
      },
      {
        title: "Response",
        isVisible: false,
        component: Response,
      },
    ],
    httpMethods: <HttpMethod[]>["GET", "POST", "DELETE", "PUT", "PATCH"],
    currentHttpsMethod: <HttpMethod>"GET",
    endpoint: <string>"https://dummyjson.com/products/1",
    response: <any>{},
  }),

  actions: {
    toggleOptionView(menuItemIndex: number) {
      this.playgroundMainMenu[menuItemIndex].isVisible =
        !this.playgroundMainMenu[menuItemIndex].isVisible;
    },

    handleMethodTabClick(methodIndex: number) {
      if (this.currentHttpsMethod !== this.httpMethods[methodIndex]) {
        this.currentHttpsMethod = this.httpMethods[methodIndex];
      }
    },

    async handleTestButton() {
      this.response = await executeCall({
        apiRequest: {
          endpoint: this.endpoint,
          method: this.currentHttpsMethod as HttpMethod,
        },
        skipCache: false,
      });

      if (this.response) {
        if (!this.playgroundMainMenu[3].isVisible) {
          this.playgroundMainMenu[3].isVisible = true;
        }
      }
    },
  },
});
