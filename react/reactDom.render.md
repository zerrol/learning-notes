
### reactDom.render() 版本 16.8.6

在方法体中直接调用`legacyRenderSubtreeIntoContainer()` 将元素绘制到`container上`，此时的container就是我们传入的`document.getElementById('#root')`节点

``` javascript
  render(
    element: React$Element<any>,
    container: DOMContainer,
    callback: ?Function,
  ) {
    // 1. 第一步 执行 legacyRenderSubtreeIntoContainer
    return ((parentComponent, children, container, callback) => {
      // 1.1 创建root节点，并赋值给container
      root = container._reactRootContainer = legacyCreateRootFromDomContainer(container)

      function legacyCreateRootFromDomContainer() {
        // 1.1.1 
        class ReactRoot {
          constructor(container) {
            // 1.1.1.1 创建 fiberRoot
            // createContainer = react-reconciler.createFiberRoot(container)
            // 其实就是创建fiberRoot
            this.root = createContainer(container)
            this._internalRoot = root
          }
        }

        return new ReactRoot(container)
      }
      
     
      // 1.2 
      // 执行 root.render(children, callback)，其实就是调用一下 Reconciler 中的 updateContainer
      // children 就是react元素
      const fiberRoot = root._internalRoot
      updateContainer(children, fiberRoot, null, callback);
    })(null,
      element,
      container,
      false,
      callback,)
  }
```

####  `updateContainer` 更新fiber节点。源码：`react-reconciler/src/ReactFiberReconciler` 版本：17.0.1

``` javascript

export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): Lane {
  // 1. 更新时间
  // lane 是 react 17 中新加入的，用来管理调度优先级的
  const current = container.current;
  const eventTime = requestEventTime();
  const lane = requestUpdateLane(current);
  
  // 2. 给context赋值
  // 在 ReactDom.render时，parentComponent为null，这里会直接返回一个空对象 {}
  // 所以相当于 context = {}
  const context = getContextForSubtree(parentComponent);
  container.context = context;
  
  // 3. 创建一个更新 并，fiber.updateQueue.push()
  // createUpdate 返回一个 Update类型的对象
  // origin: const update = createUpdate(eventTime, lane

  // 3.1 创建更新
  const update = {
    // react 16中的
    eventTime,
    lane,

    // 常量 标志位，UpdateState = 0
    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
  };

  // Caution: React DevTools currently depends on this property
  // being called "element".
  // 当前更新的react元素
  update.payload = {element};

  // 3.2 将 update 加入到 fiber.updateQueue 中。updateQueue 是一个环形队列
  enqueueUpdate(current, update);

  // 4.将当前fiber放入调度器，调度器会负责调度优先级的管理，react调度策略的核心部分
  scheduleUpdateOnFiber(current, lane, eventTime);

  return lane
}

```