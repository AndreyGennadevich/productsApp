<template>
	<div class="modal" id="wrapper">
		<div class="modal__container">
			<button
				class="modal-close"
				@click="$emit('closeModal')"
			>
				<img
					src="~@/assets/svg/cross.svg"
					alt="X"
					class="modal-close__icon"
				>
			</button>
			<h3 class="modal__title">
				Выбор населённого пункта:
			</h3>
			<div class="modal__row">
				<div class="modal-input">
					<div
						class="modal-input__block"
						:class="{ 'modal-input__block_highlight': inputValue }"
					>
						<div class="modal-input__wrapper">
							<input
								type="text"
								class="modal-input__field"
								placeholder="Например, Санкт-петербург"
								v-model="inputValue"
							>
							<button
								v-if="inputValue"
								class="modal-input__close"
								@click="inputValue=''"
							>
								<img
									src="~@/assets/svg/cross.svg"
									alt="X"
									class="modal-input__icon"
								>
							</button>
						</div>
						<ul
							v-if="citysList?.length > 0 && inputValue"
							class="modal-input__list"
						>
							<li
								v-for="item in citysList"
								:key="item.id"
								class="modal-input-item"
								@click="choiceCity(item)"
							>
								<p class="modal-input-item__value">
									{{ item.label }}
								</p>
							</li>
						</ul>
					</div>
				</div>
				<button
					class="modal__button"
					:class="{ 'modal__button_disable': !selectCity}"
					@click="acceptChoice"
				>
					Подтвердить
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
	name: "LayoutTemplateModal",
	data() {
		return {
			inputValue: "",
			selectCity: null,
			timeOut: null,
		};
	},
	emits: ["closeModal"],
	watch: {
		inputValue(newQuestion) {
			clearTimeout(this.timeOut);
			if (newQuestion.length > 2) {
				this.timeOut = setTimeout(() => {
					this.GetCitysList(this.inputValue);
				},1000);
			} else if (newQuestion === "") {
				this.UpdateCitysList(null);
			}
		}
	},
	computed: {
		...mapState("citys", ["citysList"])
	},
	methods: {
		...mapActions("citys", ["GetCitysList", "UpdateCitysList", "UpdateCity"]),
    ...mapActions("category", ["GetCategories"]),
		choiceCity(city) {
			this.inputValue = city.label;
			this.UpdateCitysList(null);
			this.selectCity = city;
		},
		acceptChoice() {
			this.UpdateCity(this.selectCity);
			this.GetCategories();
			this.$emit("closeModal");
		},
		clickOutside(e) {
			if (e.target.id === "wrapper") {
				this.$emit("closeModal");
			}
		},
	},
	beforeMount() {
		document.addEventListener("click", this.clickOutside);
	},
	unmounted() {
		document.removeEventListener("click", this.clickOutside)
	},
}
</script>

<style scoped>
.modal {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(53, 54, 71, 0.8);
	z-index: 1;
}

.modal__container {
	position: absolute;
	top: 40%;
	left: 50%;
	max-width: 770px;
	width: 100%;
	padding: 30px 20px;
	border-radius: 5px;
	background: #FFF;
	box-shadow: 0px 2px 10px 0px rgba(151, 151, 151, 0.20);
	transform: translate(-50%, 0);
}

.modal-close {
	position: absolute;
	top: 18px;
	right: 18px;
	background-color: transparent;
	cursor: pointer;
}

.modal__title {
	margin-bottom: 12px;
	color: #272727;
	font-size: 20px;
	font-weight: 600;
	line-height: 24px;
}

.modal__row {
	display: flex;
	flex-direction: column;
	gap: 14px;
}

.modal-input {
	position: relative;
	flex: 1;
	min-height: 48px;
	z-index: 1;
}

.modal-input__block {
	position: absolute;
	width: 100%;
	min-height: 48px;
	padding: 10px 16px;
	border-radius: 5px;
	border: 1px solid rgba(151, 151, 151, 0.50);
	background-color: #FFF;
	transition: border 0.1s;
}

.modal-input__block_highlight,
.modal-input__block:hover {
	border: 1px solid #272727;
}

.modal-input__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modal-input__close {
	padding: 0;
	background-color: transparent;
	cursor: pointer;
}

.modal-input__icon {
	display: block;
	width: 12px;
	height: 12px;
}

.modal-input__field {
	max-width: 480px;
	width: 100%;
	color: #272727;
	font-size: 18px;
	font-weight: 400;
	line-height: 23px;
}

.modal-input__field::placeholder {
	color: #979797;
}

.modal-input__list {
	display: flex;
	flex-direction: column;
	gap: 7px;
	overflow-y: auto;
	overflow-x: hidden;
	max-height: 144px;
	margin-top: 15px;
	padding-top: 12px;
	border-top: 1px solid #e0e0e0;
}
.modal-input__list::-webkit-scrollbar {
	width: 4px;
}
.modal-input__list::-webkit-scrollbar-track {
	background-color: transparent;
}
.modal-input__list::-webkit-scrollbar-thumb {
	background: rgba(151, 151, 151, 0.30);
	border-radius: 2px;
}

.modal-input-item {
	width: 100%;
	height: 24px;
	cursor: pointer;
}

.modal-input-item:hover {
	.modal-input-item__value {
		color: #272727;
	}
}

.modal-input-item__value {
	max-width: 450px;
	width: 100%;
	color: #979797;
	font-size: 18px;
	font-weight: 400;
	line-height: 24px;
	transition: color 0.1s;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.modal__button {
	align-self: center;
	position: relative;
	width: 174px;
	height: 48px;
	border-radius: 24px;
	border: 2px solid transparent;
	background: linear-gradient(270deg, #FFA800 0%, #FF6F00 100%);
	color: #FFF;
	font-size: 16px;
	font-weight: 600;
	line-height: 21px;
	letter-spacing: 1.75px;
	text-transform: uppercase;
	transition: filter 0.1s;
	cursor: pointer;
	transition: all 0.1s;
}

.modal__button:hover::before {
	content: "";
	position: absolute;
	left: 50%;
	bottom: -8px;
	width: 145px;
	height: 48px;
	background: linear-gradient(270deg, rgba(255, 168, 0, 0.60) 0%, rgba(255, 111, 0, 0.60) 100%);
	filter: blur(13.591408729553223px);
	transform: translateX(-50%);
	z-index: -1;
}

.modal__button_disable {
	color: #ACACAC;
	border: 2px solid rgba(151, 151, 151, 0.30);
	background: transparent;
	pointer-events: none;
}

@media screen and (min-width: 600px) {
	.modal__row {
		flex-direction: row;
	}
}
</style>