import init from '../../wasm/pkg/wasm';

/** init 初始化 */
export async function wasmInit(): Promise<void> {
  await init();
}

export * from '../../wasm/pkg/wasm';
