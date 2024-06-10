<script>
	import { onDestroy } from 'svelte';

	export let text = '';
	export let href = '';

	/**
	 * 原始文本内容
	 * @type {string}
	 */
	let originalText = '';
	/**
	 * 定时器ID
	 * @type {number}
	 */
	let intervalId;
	/**
	 * 超时ID
	 * @type {number}
	 */
	let timeoutId;
	/**
	 * 文本元素
	 * @type {HTMLSpanElement}
	 */
	let textElement;
	/**
	 * 根元素
	 * @type {HTMLSpanElement}
	 */
	let rootElement;

	/**
	 * 将文本内容打乱为随机的二进制字符串
	 */
	const shuffleBinary = () => {
		if (!textElement) return;
		const binaryArray = Array.from({ length: originalText.length }, () =>
			Math.floor(Math.random() * 2)
		).map(() => Math.floor(Math.random() * 2));
		textElement.textContent = binaryArray.join('');
	};

	/**
	 * 处理鼠标进入事件以开始文本打乱并初始化
	 */
	const onMouseEnter = () => {
		initialize();
		intervalId = setInterval(shuffleBinary, 100);
		timeoutId = setTimeout(() => {
			if (textElement) textElement.textContent = originalText;
			clearInterval(intervalId);
		}, 500);
	};

	/**
	 * 初始化组件
	 */
	const initialize = () => {
		if (textElement.textContent !== null) {
			originalText = textElement.textContent;
		}
		rootElement.addEventListener('mouseleave', onMouseLeave);
	};

	/**
	 * 处理鼠标离开事件以停止文本打乱并重置文本
	 */
	const onMouseLeave = () => {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
		if (textElement) textElement.textContent = originalText;
	};

	onDestroy(() => {
		clearInterval(intervalId);
		clearTimeout(timeoutId);
		if (rootElement) {
			rootElement.removeEventListener('mouseleave', onMouseLeave);
		}
	});
</script>

<a
	{href}
	bind:this={rootElement}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	class="text-primary"
	aria-hidden="true"
>
	<span bind:this={textElement} class="text-base tracking-tight">{text}</span>
	<slot name="icon"></slot>
</a>
