import APIMethod from "~/components/APIMethod.vue";
import GlobalConfig from "~/components/GlobalConfig.vue";
import Response from "~/components/Response.vue";
import HeaderBodyConfig from "~/components/HeaderBodyConfig.vue";
import { useNetFlux, type HttpMethod } from "~/composable/useNetFlux";
import APIEndpointSetup from "~/components/APIEndpointSetup.vue";
import type { APIState } from "~/types/api-state.type";
import { markRaw, shallowRef } from "vue";


type PlayGroundMenuOption = {
  title: string;
  isVisible: boolean;
  component: Component;
};

const initPlaygroundMainMenu: PlayGroundMenuOption[] = [
  {
    title: "Configure Globals",
    isVisible: false,
    component: markRaw(GlobalConfig),
  },
  {
    title: "Configure Method Type",
    isVisible: true,
    component: markRaw(APIMethod),
  },
  {
    title: "Configure Headers & Body",
    isVisible: true,
    component: markRaw(HeaderBodyConfig),
  },
  {
    title: "Configure Endpoint",
    isVisible: true,
    component: markRaw(APIEndpointSetup),
  },
  {
    title: "Response",
    isVisible: false,
    component: markRaw(Response),
  },
];

export const usePlaygroundStoreOpt = defineStore("playground", () => {
  /**
   * Constants & Composables
   */
  const { executeCall, updateGlobalConfig } = useNetFlux();

  /**
   * States
   */
  const playgroundMainMenu = ref<PlayGroundMenuOption[]>([...initPlaygroundMainMenu]);

  const headers = ref<Record<string, string>>({
    "Content-Type": "application/json"
  });
  const body = ref<string>("");

  const httpMethods = ref<HttpMethod[]>([
    "GET",
    "POST",
    "DELETE",
    "PUT",
    "PATCH",
  ]);
  const currentHttpsMethod = ref<HttpMethod>("GET");
  const endpoint = ref<string>("https://dummyjson.com/products/1");
  const response = ref<any>({});
  const responseState = ref<APIState>({
    status: "idle",
    message: "Response State",
    data: {},
  });

  /**
   * Methods & Functions
   */
  const toggleOptionView = (menuItemIndex: number) => {
     
    playgroundMainMenu.value[menuItemIndex].isVisible =
      !playgroundMainMenu.value[menuItemIndex].isVisible;
  };

  const handleMethodTabClick = (methodIndex: number) => {
    if (currentHttpsMethod.value !== httpMethods.value[methodIndex]) {
      currentHttpsMethod.value = httpMethods.value[methodIndex];
    }
  };

  const handleTestButton = async () => {
    response.value = await executeCall({
      apiRequest: {
        endpoint: endpoint.value,
        method: currentHttpsMethod.value as HttpMethod,
      },
      skipCache: false,
    });

    if (response.value) {
      if (!playgroundMainMenu.value[3].isVisible) {
        playgroundMainMenu.value[3].isVisible = true;
      }
    }
  };

  return {
    playgroundMainMenu,
    httpMethods,
    currentHttpsMethod,
    endpoint,
    response,
    toggleOptionView,
    handleMethodTabClick,
    handleTestButton,
    headers,
    body,
  };
});
