import moment from "moment";
import Split from "base/split/split";
import RatingSelect from "components/rating-select/rating-select";

export const popupMixin = {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true
      this.$emit("show")
    },
    hide() {
      this.visible = false
      this.$emit("hide")
    }
  },
}


const ALL = 2;
export const ratingsMixin = {
  data() {
    return {
      ratingTypeMap: ["icon-thumb_up", "icon-thumb_down"],
      contentOnly: false,
      selectType: ALL
    };
  },
  computed: {
    computedRatings() {
      let ratings = this.ratings;
      let ret = [];
      ratings.forEach(item => {
        if (this.contentOnly && !item.text) {
          return;
        }
        if (this.selectType == 2 || this.selectType == item.rateType) {
          ret.push(item)
        }
      });
      return ret;
    }
  },
  methods: {
    toggleContent: function (boolean) {
      this.contentOnly = boolean;
    },
    select: function (type) {
      this.selectType = type;
    },
    rateTime: function (a) {
      return moment(a).format("YYYY-MM-DD HH:mm");
    }
  },
  components: {
    RatingSelect,
    Split
  }
}