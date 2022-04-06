<template>
  <v-skeleton-loader
    v-if="is_loading"
    type="table-heading, table-tbody, table-tfoot"
    class="w-100 mt-2"
  />
  <div v-else id="base-table" class="app-max-width">
    <div class="py-4 px-7 white rounded-lg">
      <v-row
        dense
        class="d-flex justify-space-between align-center mb-1 table-features"
      >
        <v-col cols="12" md="6" class="d-flex justify-start">
          <slot name="search"></slot>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="d-flex flex-column flex-sm-row functions-box pl-1 pl-md-4"
        >
          <slot name="filter"></slot>
          <slot name="sort"></slot>
          <slot name="manage"></slot>
        </v-col>

        <div class="pl-2">
          <slot name="search-copywritting"></slot>
        </div>
      </v-row>
      <v-row class="table-data pa-3 pt-0 mt-0">
        <v-data-table
          :headers="table_headers"
          :items="table_items"
          :loading="is_loading"
          loading-text="Loading... Please wait"
          item-key="_id"
          hide-default-footer
          class="w-100"
          :items-per-page="-1"
        >
          <template
            v-for="(header, index) in table_headers"
            v-slot:[`header.${header.value}`]
          >
            <span :key="index" class="white">
              <span class="text-body-2 header-title black--text">
                <span class="kinobi-title">
                  <span v-html="header.text"></span>
                </span>
              </span>

              <v-tooltip v-if="header.tooltip" right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small icon v-bind="attrs" v-on="on">
                    <v-icon small>mdi-information-outline</v-icon>
                  </v-btn>
                </template>
                <span v-html="$t(header.tooltip)"></span>
              </v-tooltip>
            </span>
          </template>

          <template
            v-for="(slot, index) in item_slots"
            v-slot:[`item.${slot}`]="{ item }"
          >
            <slot :name="`item.${slot}`" :item="item">
              <div class="text-body-1" :key="index">
                <span class="kinobi-body">{{ item[slot] }}</span>
              </div>
            </slot>
          </template>

          <template v-slot:no-data>
            <div class="w-100 text-center">
              <slot name="no-data"><span>No data found</span></slot>
            </div>
          </template>
        </v-data-table>

        <v-row no-gutters align="center" justify="center">
          <slot name="infinite-loading"></slot>
        </v-row>
      </v-row>
    </div>
    <v-row justify="center" class="my-2">
      <slot name="pagination"></slot>
    </v-row>
  </div>
</template>

<script>
import systemMixins from "@/mixins/system";
import userMixins from "@/mixins/user";

export default {
  name: "BaseTable",
  mixins: [userMixins, systemMixins],
  props: {
    table_headers: {
      type: Array,
      default() {
        return [
          {
            text: "First name",
            value: "first_name",
            icon: "mdi-plus",
            tooltip: "Header tooltip",
          },
          {
            text: "Last Name",
            value: "last_name",
            icon: "mdi-plus",
            tooltip: "Header tooltip",
          },
          {
            text: "Address",
            value: "address",
            icon: "mdi-plus",
            tooltip: "Header tooltip",
          },
          {
            text: "Phone",
            value: "phone",
            icon: "mdi-plus",
            tooltip: "Header tooltip",
          },
        ];
      },
    },
    table_items: {
      type: Array,
      default() {
        return [
          {
            first_name: "first_name",
            last_name: "last_name",
            address: "Address",
            phone: "phone",
          },
          {
            first_name: "first_name",
            last_name: "last_name",
            address: "Address",
            phone: "phone",
          },
          {
            first_name: "first_name",
            last_name: "last_name",
            address: "Address",
            phone: "phone",
          },
          {
            first_name: "first_name",
            last_name: "last_name",
            address: "Address",
            phone: "phone",
          },
        ];
      },
    },
    is_loading: {
      type: Boolean,
      default() {
        return true;
      },
    },
    item_slots: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.functions-box {
  justify-content: start;
  gap: 20px !important;
}
.header-title {
  vertical-align: middle !important;
}
::v-deep .v-data-table-header tr th {
  background-color: #ffffff !important;
  color: white !important;
  height: 65px !important;
  border: none !important;
  text-align: left !important;
}

::v-deep .v-data-table tr td {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  text-align: left !important;
}
@media screen and (max-width: 599px) {
  .functions-box {
    gap: 10px !important;
  }
}
</style>
